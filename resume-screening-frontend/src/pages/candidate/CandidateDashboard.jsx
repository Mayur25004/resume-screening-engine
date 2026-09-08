import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Empty from "../../components/common/Empty.jsx";
import Applications from "../../components/candidate/Applications.jsx";

export default function CandidateDashboard() {
  const {
    setCandidatePage, activeCandidate, myResults, myApplications
  } = useApp();
    const short = myResults.filter((r) => r.status === "SHORTLISTED").length;
    return (
      <>
        <Header
          eyebrow="Your workspace"
          title={`Welcome${activeCandidate ? `, ${activeCandidate.name.split(" ")[0]}` : ""} 👋`}>
          Here’s what’s happening with your applications.
        </Header>
        
        {activeCandidate ? (
          <>
            <section className="stats candidate-stats">
              {[
                ["▣", "Applications", myApplications.length, "violet"],
                [
                  "◷",
                  "In progress",
                  myResults.filter((r) => r.status === "MAYBE").length,
                  "orange",
                ],
                ["✓", "Shortlisted", short, "green"],
              ].map(([icon, label, value, tone]) => (
                <article className="stat" key={label}>
                  <i className={tone}>{icon}</i>
                  <div>
                    <p>{label}</p>
                    <strong>{value}</strong>
                  </div>
                </article>
              ))}
            </section>
            <section className="card">
              <div className="heading">
                <div>
                  <h2>Recent applications</h2>
                  <p>Your latest screening outcomes.</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setCandidatePage("applications")}
                >
                  View all →
                </button>
              </div>
              <Applications data={myApplications.slice(-3).reverse()} />
            </section>
          </>
        ) : (
          <Empty
            title="Candidate profile not found"
            detail="Your account is not linked to a candidate profile yet."
          />
        )}
      </>
    );
  }
