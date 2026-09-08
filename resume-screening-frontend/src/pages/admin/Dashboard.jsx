import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Table from "../../components/common/Table.jsx";

export default function Dashboard() {
  const {
    setPage, jobs, candidates, results
  } = useApp();
    const short = results.filter((r) => r.status === "SHORTLISTED").length;
    return (
      <>
        <Header eyebrow="Overview" title="Hiring dashboard">
          Keep roles, candidates and screening results in one place.
        </Header>
        <section className="stats">
          {[
            ["▣", "Open roles", jobs.length, "violet"],
            ["♙", "Candidates", candidates.length, "blue"],
            ["◎", "Screenings", results.length, "orange"],
            ["✓", "Shortlisted", short, "green"],
          ].map(([icon, label, value, color]) => (
            <article className="stat" key={label}>
              <i className={color}>{icon}</i>
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
              <h2>Recent screening activity</h2>
              <p>Your latest candidate matches.</p>
            </div>
            <button className="text-button" onClick={() => setPage("results")}>
              View all →
            </button>
          </div>
          <Table data={[...results].slice(-5).reverse()} />
        </section>
      </>
    );
  }
