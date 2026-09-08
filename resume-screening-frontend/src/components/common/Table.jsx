import { useApp } from "../../context/AppContext";
import Empty from "./Empty.jsx";

export default function Table({ data }) {
  const { candidatesById, jobsById, date } = useApp();
    if (!data.length)
      return (
        <Empty
          title="No screening results yet"
          detail="Screening results will appear automatically when candidates apply for jobs."
        />
      );
    return (
      <div className="table-wrap">
        <table>
          <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Match score</th>
                <th>Status</th>
                <th>Screened</th>
              </tr>
            </thead>
          <tbody>
            {data.map((result) => {
              const c = candidatesById.get(result.candidateId),
                j = jobsById.get(result.jobId),
                score = Number(result.matchingScore || 0),
                tone = score >= 75 ? "high" : score >= 50 ? "medium" : "low";
              return (
                <tr
                  key={
                    result.resultId ?? `${result.candidateId}-${result.jobId}`
                  }
                >
                  <td>
                    <div className="person">
                      <i>{c?.name?.[0]?.toUpperCase() || "?"}</i>
                      <div>
                        <strong>
                          {c?.name || `Candidate #${result.candidateId}`}
                        </strong>
                        <small>
                          {c?.currentTitle || c?.email || "Candidate"}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{j?.title || `Job #${result.jobId}`}</td>
                  <td>
                    <span className={`score ${tone}`}>{score}%</span>
                  </td>
                  <td>
                    <span
                      className={`status ${String(result.status || "pending").toLowerCase()}`}
                    >
                      {result.status || "PENDING"}
                    </span>
                  </td>
                  <td>{date(result.screenedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
