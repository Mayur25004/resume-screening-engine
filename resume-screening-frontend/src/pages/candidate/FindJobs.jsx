import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";

export default function FindJobs() {
  const {
    jobSearch, setJobSearch, jobs, myApplications, applyToJob
  } = useApp();
    const filtered = jobs.filter((job) =>
      `${job.title} ${job.description} ${job.location}`
        .toLowerCase()
        .includes(jobSearch.toLowerCase()),
    );
    return (
      <>
        <Header eyebrow="Explore opportunities" title="Find jobs">
          Search current openings that match your skills and experience.
        </Header>
        <div className="search">
          <span>⌕</span>
          <input
            value={jobSearch}
            onChange={(e) => setJobSearch(e.target.value)}
            placeholder="Search jobs, skills, or location"
          />
        </div>
        <section className="jobs find-grid">
          {filtered.length ? (
            filtered.map((job) => (
              <article className="job" key={job.jobId}>
                <div className="job-top">
                  <i>▣</i>
                  <small>OPEN ROLE</small>
                </div>
                <h2>{job.title}</h2>
                <div className="meta">
                  <span>⌖ {job.location || "Location flexible"}</span>
                  <span>
                    ◷ {job.experienceRequired || "Experience not specified"}
                  </span>
                </div>
                <p>
                  {job.description ||
                    "Explore this open role and its requirements."}
                </p>
                <Button
                  className="secondary"
                  disabled={myApplications.some(
                    (application) =>
                      Number(application.jobId) === Number(job.jobId)
                  )}
                  onClick={() => applyToJob(job.jobId)}
                >
                  {myApplications.some(
                    (application) =>
                      Number(application.jobId) === Number(job.jobId)
                  )
                    ? "Applied"
                    : "Apply →"}
                </Button>
              </article>
            ))
          ) : (
            <Empty
              title="No matching jobs"
              detail="Try a different job title, skill or location."
            />
          )}
        </section>
      </>
    );
  }
