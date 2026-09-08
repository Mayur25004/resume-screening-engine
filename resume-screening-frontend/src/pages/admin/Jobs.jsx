import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";
import JobForm from "../../components/admin/JobForm.jsx";
import Skills from "../../components/admin/Skills.jsx";
import JobDetails from "../../components/admin/JobDetails.jsx";

export default function Jobs() {
  const {
    setPage, jobs, setJobs, jobFormOpen, setJobFormOpen, managedJob, jobDetails, setJobDetails, setEditingJob, deleteJobTarget, setDeleteJobTarget, setJobId, request, message, startEditingJob, manageSkills
  } = useApp();
    return (
      <>
        <Header eyebrow="Roles" title="Job openings">
          Set up a role, add requirements and screen candidates.
        </Header>
        <div className="top-action">
          <Button
              onClick={() => {
                setEditingJob(null);
                setJobFormOpen(true);
              }}
            >
              Create job +
            </Button>
        </div>
        {jobFormOpen && <JobForm />}
        {managedJob && <Skills />}
        {jobDetails && <JobDetails />}
        {jobs.length ? (
          <section className="jobs">
            {jobs.map((job) => (
              <article className="job" key={job.jobId} 
                        onClick={() => setJobDetails(job)}
                        style={{ cursor: "pointer" }}>
                <div className="job-top">
                  <i>▣</i>
                  <small>ROLE #{job.jobId}</small>
                </div>
                <h2>{job.title}</h2>
                <p>
                  {job.description ||
                    "No description has been added for this role."}
                </p>
                <div className="meta">
                  <span>⌖ {job.location || "Location flexible"}</span>
                  <span>
                    ◷ {job.experienceRequired || "Experience not specified"}
                  </span>
                </div>
                <div className="job-actions">
                  <Button
                    className="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingJob(job);
                    }}
                  >
                    Edit
                  </Button>
                 <Button
                  className="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteJobTarget(job);
                  }}
                >
                  Delete
                </Button>

                  <Button
                    className="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      manageSkills(job);
                    }}
                  >
                    Requirements
                  </Button>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setJobId(String(job.jobId));
                      setPage("screening");
                    }}
                  >
                    Screen →
                  </Button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <Empty
            title="No jobs yet"
            detail="Create your first role to start screening candidates."
            action={
              <Button onClick={() => setJobFormOpen(true)}>Create job</Button>
            }
          />
        )}
    

      {deleteJobTarget && (
            <div
              className="delete-modal-overlay"
              onClick={() => setDeleteJobTarget(null)}
            >
              <div
                className="delete-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="delete-modal-close"
                  onClick={() => setDeleteJobTarget(null)}
                >
                  ×
                </button>

              

                <h2>Delete job?</h2>

                <p className="delete-modal-message">
                  Are you sure you want to delete{" "}
                  <strong>"{deleteJobTarget.title}"</strong>?
                </p>

                <p className="delete-modal-warning">
                  This will also remove its requirements, applications and
                  screening results.
                </p>

                <div className="delete-modal-actions">
                  <Button
                    className="secondary"
                    onClick={() => setDeleteJobTarget(null)}
                  >
                    Cancel
                  </Button>

                  <Button
                  className="delete-confirm-button"
                  onClick={async () => {
                    const jobToDelete = deleteJobTarget;

                    try {
                      await request(`/jobs/${jobToDelete.jobId}`, {
                        method: "DELETE",
                      });

                      // Remove the deleted job from the screen immediately
                      setJobs((currentJobs) =>
                        currentJobs.filter(
                          (job) => Number(job.jobId) !== Number(jobToDelete.jobId)
                        )
                      );

                      // Close the popup immediately
                      setDeleteJobTarget(null);

                      message("success", "Job deleted successfully.");
                    } catch (error) {
                      message(
                        "error",
                        error.message || "Failed to delete job."
                      );
                    }
                  }}
                >
                  Delete job
                </Button>
                </div>
              </div>
            </div>
          )}
      </>
    );
  }
