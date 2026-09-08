import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";

export default function FindJobs() {
  const {
    jobSearch, setJobSearch, jobs, myApplications, applyToJob
  } = useApp();

  const [selectedJob, setSelectedJob] = useState(null);
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
        {selectedJob && (
            <section className="card job-details">
              <Button
                className="secondary"
                onClick={() => setSelectedJob(null)}
              >
                ← Back to jobs
              </Button>

              <div className="job-details-header">
                <small>OPEN ROLE</small>
                <h1>{selectedJob.title}</h1>
                <p>{selectedJob.description}</p>
              </div>

              <div className="job-details-grid">
                <div>
                  <strong>Location</strong>
                  <span>{selectedJob.location || "Not specified"}</span>
                </div>

                <div>
                  <strong>Department</strong>
                  <span>{selectedJob.department || "Not specified"}</span>
                </div>

                <div>
                  <strong>Job Type</strong>
                  <span>{selectedJob.jobType || "Not specified"}</span>
                </div>

                <div>
                  <strong>Work Mode</strong>
                  <span>{selectedJob.workMode || "Not specified"}</span>
                </div>

                <div>
                  <strong>Experience</strong>
                  <span>
                    {selectedJob.minExperience != null
                      ? `${selectedJob.minExperience} years`
                      : "Not specified"}
                  </span>
                </div>

                <div>
                  <strong>Openings</strong>
                  <span>{selectedJob.numberOfOpenings || "Not specified"}</span>
                </div>

                <div>
                  <strong>Salary</strong>
                  <span>{selectedJob.salaryRange || "Not specified"}</span>
                </div>

                <div>
                  <strong>Education</strong>
                  <span>
                    {selectedJob.educationQualification || "Not specified"}
                  </span>
                </div>

                <div>
                  <strong>Preferred Degree</strong>
                  <span>{selectedJob.preferredDegree || "Not specified"}</span>
                </div>

                <div>
                  <strong>Certifications</strong>
                  <span>{selectedJob.certifications || "Not specified"}</span>
                </div>

                <div>
                  <strong>Application Deadline</strong>
                  <span>
                    {selectedJob.applicationDeadline || "Not specified"}
                  </span>
                </div>

                <div>
                  <strong>Expected Joining</strong>
                  <span>
                    {selectedJob.expectedJoiningDate || "Not specified"}
                  </span>
                </div>
              </div>

              <div className="job-details-section">
                <h2>Required Skills</h2>

                <p>
                  Skills required for this position will be displayed here.
                </p>
              </div>

              <div className="job-details-section">
                <h2>Benefits</h2>
                <p>{selectedJob.benefits || "Not specified"}</p>
              </div>

              <div className="job-details-section">
                <h2>Interview Process</h2>
                <p>{selectedJob.interviewProcess || "Not specified"}</p>
              </div>

              <Button
                disabled={myApplications.some(
                  (application) =>
                    Number(application.jobId) === Number(selectedJob.jobId)
                )}
                onClick={() => applyToJob(selectedJob.jobId)}
              >
                {myApplications.some(
                  (application) =>
                    Number(application.jobId) === Number(selectedJob.jobId)
                )
                  ? "Applied"
                  : "Apply Now →"}
              </Button>
            </section>
                    )}

          <section className="jobs find-grid">
            {filtered.length ? (
            filtered.map((job) => (
              <article
                className="job"
                key={job.jobId}
                onClick={() => setSelectedJob(job)}
                style={{ cursor: "pointer" }}
              >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    applyToJob(job.jobId);
                  }}
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
