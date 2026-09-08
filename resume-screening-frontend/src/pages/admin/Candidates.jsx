import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";
import CandidateForm from "../../components/admin/CandidateForm.jsx";

export default function Candidates() {
  const {
    candidates, results, candidateFormOpen, setCandidateFormOpen, candidateDetails, setCandidateDetails, jobsById, API
  } = useApp();
  return (
    <>
      <Header eyebrow="Talent pool" title="Candidates">
        Add candidates and upload their resumes for skill extraction.
      </Header>

      <div className="top-action">
        <Button onClick={() => setCandidateFormOpen(true)}>
          Add candidate +
        </Button>
      </div>

      {candidateFormOpen && <CandidateForm />}

      {candidates.length ? (
        <section className="candidates">
          {candidates.map((c) => (
            <article className="candidate" key={c.candidateId}>
              <i>{c.name?.[0]?.toUpperCase() || "?"}</i>

              <div>
                <h2>{c.name}</h2>
                <p>{c.currentTitle || "Candidate"}</p>
                <small>{c.email}</small>
              </div>

              <footer>
                <span>
                  {c.experienceYears
                    ? `${c.experienceYears} yrs exp.`
                    : "Experience not listed"}
                </span>

                <button
                  className="text-button"
                  onClick={() => setCandidateDetails(c)}
                >
                  View details →
                </button>
              </footer>
            </article>
          ))}
        </section>
      ) : (
        <Empty
          title="No candidates yet"
          detail="Add profiles, then upload their resumes to extract skills."
          action={
            <Button onClick={() => setCandidateFormOpen(true)}>
              Add candidate
            </Button>
          }
        />
      )}

      {candidateDetails && (
        <div
          className="candidate-details-overlay"
          onClick={() => setCandidateDetails(null)}
        >
          <section
            className="candidate-details-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="candidate-details-header">
              <div>
                <span className="eyebrow">Candidate profile</span>
                <h2>{candidateDetails.name}</h2>
                <p>
                  {candidateDetails.currentTitle || "Candidate"}
                </p>
              </div>

              <button
                className="text-button"
                onClick={() => setCandidateDetails(null)}
              >
                ✕ Close
              </button>
            </div>

            <div className="candidate-details-grid">
              <div>
                <small>Email</small>
                <strong>
                  {candidateDetails.email || "Not added"}
                </strong>
              </div>

              <div>
                <small>Phone</small>
                <strong>
                  {candidateDetails.phone || "Not added"}
                </strong>
              </div>

              <div>
                <small>Experience</small>
                <strong>
                  {candidateDetails.experienceYears
                    ? `${candidateDetails.experienceYears} years`
                    : "Not listed"}
                </strong>
              </div>

              <div>
                <small>Resume</small>

                {candidateDetails.resumePath ? (
                  <>
                    <strong>✓ Uploaded</strong>

                    <button
                      className="text-button"
                      onClick={() =>
                        window.open(
                          `${API}/candidates/${candidateDetails.candidateId}/resume`,
                          "_blank"
                        )
                      }
                      style={{ marginTop: "6px" }}
                    >
                      View Resume ↗
                    </button>
                  </>
                ) : (
                  <strong>⚠ Not uploaded</strong>
                )}
              </div>
            </div>

            <div className="candidate-details-section">
              <h3>Screening outcome</h3>

              {(() => {
                const candidateResults = results.filter(
                  (result) =>
                    Number(result.candidateId) ===
                    Number(candidateDetails.candidateId)
                );

                if (!candidateResults.length) {
                  return (
                    <p className="details-muted">
                      This candidate has not been screened yet.
                    </p>
                  );
                }

                return (
                  <div className="screening-summary">
                    {candidateResults.map((result) => {
                      const job = jobsById.get(
                        Number(result.jobId)
                      );

                      return (
                        <div
                          className="screening-summary-row"
                          key={
                            result.resultId ||
                            result.screeningResultId ||
                            `${result.candidateId}-${result.jobId}`
                          }
                        >
                          <div>
                            <strong>
                              {job?.title ||
                                `Job #${result.jobId}`}
                            </strong>

                            <small>
                              Match score:{" "}
                              <b>
                                {Number(
                                  result.matchingScore || 0
                                )}
                                %
                              </b>
                            </small>
                          </div>

                          <span
                            className={`status ${String(
                              result.status || "PENDING"
                            ).toLowerCase()}`}
                          >
                            {result.status || "PENDING"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
