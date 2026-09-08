import "./App.css";
import "./RolePortal.css";
import "./Auth.css";
import { AppProvider, useApp } from "./context/AppContext";
import AuthPage from "./pages/Auth.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Jobs from "./pages/admin/Jobs.jsx";
import Candidates from "./pages/admin/Candidates.jsx";
import Results from "./pages/admin/Results.jsx";
import ApplicationsAdmin from "./pages/admin/ApplicationsAdmin.jsx";
import CandidateDashboard from "./pages/candidate/CandidateDashboard.jsx";
import FindJobs from "./pages/candidate/FindJobs.jsx";
import MyApplications from "./pages/candidate/MyApplications.jsx";
import MyProfile from "./pages/candidate/MyProfile.jsx";
import MyResume from "./pages/candidate/MyResume.jsx";

const nav = {
  dashboard: ["⌂", "Dashboard"],
  jobs: ["▣", "Job openings"],
  candidates: ["♙", "Candidates"],
  results: ["↗", "Results"],
  applications: ["▤", "Applications"],
};

function AdminPortal() {
  const { page, setPage, logout, notice, setNotice, loading } = useApp();

  const pages = {
    dashboard: <Dashboard />,
    jobs: <Jobs />,
    candidates: <Candidates />,
    results: <Results />,
    applications: <ApplicationsAdmin />,
  };

  return (
    <div className="app">
      <aside>
        <a
          className="brand"
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setPage("dashboard");
          }}
        >
          <i>r/</i>
          <div>
            <strong>
              resume<span>flow</span>
            </strong>
            <small>Hiring workspace</small>
          </div>
        </a>
        <nav>
          {Object.entries(nav).map(([key, [icon, label]]) => (
            <button
              key={key}
              className={page === key ? "active" : ""}
              onClick={() => setPage(key)}
            >
              <i>{icon}</i>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <footer>
          <button className="logout" onClick={logout}>
            ↪ <span>Logout</span>
          </button>
        </footer>
      </aside>
      <main>
        {notice && (
          <div className={`notice ${notice.type}`}>
            <b>{notice.type === "success" ? "✓" : "!"}</b>
            {notice.text}
            <button onClick={() => setNotice(null)}>×</button>
          </div>
        )}
        {loading ? <div className="loading">Loading workspace…</div> : pages[page]}
      </main>
    </div>
  );
}

function CandidatePortal() {
  const { candidatePage, setCandidatePage, logout, notice, setNotice, loading } = useApp();

  const candidatePages = {
    dashboard: <CandidateDashboard />,
    jobs: <FindJobs />,
    applications: <MyApplications />,
    profile: <MyProfile />,
    resume: <MyResume />,
  };

  return (
    <div className="app candidate-app">
      <aside>
        <a
          className="brand"
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            setCandidatePage("dashboard");
          }}
        >
          <i>r/</i>
          <div>
            <strong>
              resume<span>flow</span>
            </strong>
            <small>Candidate portal</small>
          </div>
        </a>
        <nav>
          {Object.entries({
            dashboard: ["⌂", "Dashboard"],
            jobs: ["⌕", "Find jobs"],
            applications: ["▤", "My applications"],
            profile: ["♙", "My profile"],
            resume: ["", "My resume"],
          }).map(([key, [icon, label]]) => (
            <button
              key={key}
              className={candidatePage === key ? "active" : ""}
              onClick={() => setCandidatePage(key)}
            >
              <i>{icon}</i>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <footer>
          <button className="logout" onClick={logout}>
            ↪ <span>Logout</span>
          </button>
        </footer>
      </aside>
      <main>
        {notice && (
          <div className={`notice ${notice.type}`}>
            <b>{notice.type === "success" ? "✓" : "!"}</b>
            {notice.text}
            <button onClick={() => setNotice(null)}>×</button>
          </div>
        )}
        {loading ? (
          <div className="loading">Loading workspace…</div>
        ) : (
          candidatePages[candidatePage]
        )}
      </main>
    </div>
  );
}

function AppContent() {
  const { currentUser } = useApp();

  if (!currentUser) return <AuthPage />;
  if (currentUser.role?.toUpperCase() === "CANDIDATE") {
    return <CandidatePortal />;
  }
  return <AdminPortal />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
