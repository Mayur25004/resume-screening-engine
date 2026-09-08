import { useApp } from "../../context/AppContext";
import Button from "../common/Button.jsx";
import Empty from "../common/Empty.jsx";

export default function Applications({ data }) {
  const { setCandidatePage, results, jobsById, date } = useApp();
  if (!data.length)
    return (
      <Empty
        title="No applications yet"
        detail="Browse open jobs, then apply to a job."
        action={
          <Button onClick={() => setCandidatePage("jobs")}>
            Find jobs
          </Button>
        }
      />
    );

  return (
    <div className="application-list">
      {data.map((application) => {
        const job = jobsById.get(application.jobId);

        const screening = results.find(
          (result) =>
            Number(result.candidateId) === Number(application.candidateId) &&
            Number(result.jobId) === Number(application.jobId)
        );

        return (
          <article
            className="application"
            key={application.applicationId}
          >
            <div>
              <h3>
                {job?.title || `Job #${application.jobId}`}
              </h3>

              <p>
                ⌖ {job?.location || "Location not specified"}
              </p>

              <small>
                Applied {date(application.appliedAt)}
              </small>

              {screening ? (
                <div style={{ marginTop: "10px" }}>
                  <small>
                    Match Score:{" "}
                    <strong>
                      {Number(screening.matchingScore || 0)}%
                    </strong>
                  </small>
                </div>
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <small>Screening: Pending</small>
                </div>
              )}
            </div>

            <div className="application-statuses">
  <div>
    <small>Application Status</small>
    <span
      className={`status ${String(
        application.status || "APPLIED"
      ).toLowerCase()}`}
    >
      {application.status || "APPLIED"}
    </span>
  </div>

  {screening && (
    <div style={{ marginTop: "10px" }}>
      <small>Screening</small>
      <span
        className={`status ${String(
          screening.status || "PENDING"
        ).toLowerCase()}`}
      >
        {screening.status || "PENDING"}
      </span>
    </div>
  )}
</div>
          </article>
        );
      })}
    </div>
  );
}
