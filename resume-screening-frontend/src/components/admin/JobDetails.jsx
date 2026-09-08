import { useApp } from "../../context/AppContext";

export default function JobDetails() {
  const {
    jobDetails, setJobDetails
  } = useApp();
  if (!jobDetails) return null;

  const job = jobDetails;

  return (
    <section className="card form-card">
      <div className="heading">
        <div>
          <span className="eyebrow">Job opening</span>
          <h2>{job.title}</h2>
          <p>{job.department || "Department not specified"}</p>
        </div>

        <button
          className="close"
          onClick={() => setJobDetails(null)}
        >
          ×
        </button>
      </div>

      <div className="candidate-details-grid">
        <div>
          <small>Department</small>
          <strong>{job.department || "Not specified"}</strong>
        </div>

        <div>
          <small>Location</small>
          <strong>{job.location || "Not specified"}</strong>
        </div>

        <div>
          <small>Job Type</small>
          <strong>{job.jobType || "Not specified"}</strong>
        </div>

        <div>
          <small>Work Mode</small>
          <strong>{job.workMode || "Not specified"}</strong>
        </div>

        <div>
          <small>Number of Openings</small>
          <strong>{job.numberOfOpenings ?? "Not specified"}</strong>
        </div>

        <div>
          <small>Experience</small>
          <strong>
            {job.minExperience != null || job.maxExperience != null
              ? `${job.minExperience ?? 0} - ${job.maxExperience ?? "Above"} years`
              : "Not specified"}
          </strong>
        </div>

        <div>
          <small>Salary / CTC</small>
          <strong>{job.salaryRange || "Not specified"}</strong>
        </div>

        <div>
          <small>Application Deadline</small>
          <strong>
            {job.applicationDeadline || "Not specified"}
          </strong>
        </div>

        <div>
          <small>Expected Joining Date</small>
          <strong>
            {job.expectedJoiningDate || "Not specified"}
          </strong>
        </div>

        <div>
          <small>Education Qualification</small>
          <strong>
            {job.educationQualification || "Not specified"}
          </strong>
        </div>

        <div>
          <small>Preferred Degree</small>
          <strong>{job.preferredDegree || "Not specified"}</strong>
        </div>

        <div>
          <small>Certifications</small>
          <strong>{job.certifications || "Not specified"}</strong>
        </div>

        <div>
          <small>Interview Rounds</small>
          <strong>{job.interviewRounds ?? "Not specified"}</strong>
        </div>

        <div>
          <small>Recruiter Contact</small>
          <strong>{job.recruiterContact || "Not specified"}</strong>
        </div>
      </div>

      <div className="candidate-details-section">
        <h3>Bonus / Incentives</h3>
        <p>
          {job.bonusIncentives || "No bonus or incentives specified."}
        </p>
      </div>

      <div className="candidate-details-section">
        <h3>Benefits</h3>
        <p>
          {job.benefits || "No benefits specified."}
        </p>
      </div>

      <div className="candidate-details-section">
        <h3>Interview Process</h3>
        <p>
          {job.interviewProcess || "Interview process not specified."}
        </p>
      </div>

      <div className="candidate-details-section">
        <h3>Job Description</h3>
        <p>
          {job.description || "No description available."}
        </p>
      </div>
    </section>
  );
}
