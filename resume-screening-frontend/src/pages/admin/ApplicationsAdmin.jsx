import { useApp } from "../../context/AppContext";

export default function ApplicationsAdmin() {
  const {
    candidates, results, applications, jobsById, date, updateApplicationStatus
  } = useApp();
  return (
    <div>
      <div className="section-heading">
        <div>
          <h2>Applications</h2>
          <p>Review candidate applications and update their status.</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>Candidate applications will appear here.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job</th>
                <th>Location</th>
                <th>Applied On</th>
                <th>Application Status</th>
                <th>Match Score</th>
                <th>Screening Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => {
                const candidate = candidates.find(
                  (c) =>
                    Number(c.candidateId) ===
                    Number(application.candidateId),
                );

                const job = jobsById.get(application.jobId);
                const screening = results.find(
                  (result) =>
                    Number(result.candidateId) === Number(application.candidateId) &&
                    Number(result.jobId) === Number(application.jobId)
                );

                return (
                  <tr key={application.applicationId}>
                    <td>
                      <strong>
                        {candidate?.name || `Candidate #${application.candidateId}`}
                      </strong>
                      <br />
                      <small>{candidate?.email || "—"}</small>
                    </td>

                    <td>{job?.title || `Job #${application.jobId}`}</td>

                    <td>{job?.location || "—"}</td>

                    <td>{date(application.appliedAt)}</td>

                    <td>
                      <select
                        value={application.status || "APPLIED"}
                        onChange={(e) =>
                          updateApplicationStatus(
                            application.applicationId,
                            e.target.value,
                          )
                        }
                      >
                        {application.status === "APPLIED" && (
                          <option value="APPLIED" disabled>
                            APPLIED
                          </option>
                        )}
                        
                        <option value="INTERVIEW">INTERVIEW</option>
                        <option value="SELECTED">SELECTED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td>
                      {screening ? (
                        <strong>
                          {screening.matchingScore != null
                            ? `${Number(screening.matchingScore).toFixed(0)}%`
                            : "—"}
                        </strong>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td>
                      {screening ? (
                        <span
                          className={`status ${String(
                            screening.status || "PENDING"
                          ).toLowerCase()}`}
                        >
                          {screening.status || "PENDING"}
                        </span>
                      ) : (
                        <span className="status">PENDING</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
