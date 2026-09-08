import { useApp } from "../../context/AppContext";
import Button from "../common/Button.jsx";

export default function JobForm() {
  const {
    currentUser, busy, setJobFormOpen, editingJob, jobForm, setJobForm, submitJob
  } = useApp();
    return (
      <section className="card form-card">
        <div className="heading">
          <div>
            <h2>{editingJob ? "Edit job opening" : "New job opening"}</h2>
            <p>
              {editingJob
                ? "Update the details of this job opening."
                : `Created by ${currentUser.name}.`}
            </p>
          </div>
          <button className="close" onClick={() => setJobFormOpen(false)}>
            ×
          </button>
        </div>
        <form className="form-grid" onSubmit={submitJob}>
          <label>
            Job title
            <input
              required
              value={jobForm.title}
              onChange={(e) =>
                setJobForm({ ...jobForm, title: e.target.value })
              }
              placeholder="e.g. Frontend Developer"
            />
          </label>
          <label>
            Location
            <input
              value={jobForm.location}
              onChange={(e) =>
                setJobForm({ ...jobForm, location: e.target.value })
              }
              placeholder="e.g. Bengaluru / Remote"
            />
          </label>
          <label>
            Department
            <input value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })} placeholder="Engineering / IT" />
          </label>
          <label>
            Job type
            <select value={jobForm.jobType} onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </label>
          <label>
            Work mode
            <select value={jobForm.workMode} onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value })}>
              <option value="ONSITE">On-site</option>
              <option value="HYBRID">Hybrid</option>
              <option value="REMOTE">Remote</option>
            </select>
          </label>
          <label>
            Number of openings
            <input min="1" type="number" value={jobForm.numberOfOpenings} onChange={(e) => setJobForm({ ...jobForm, numberOfOpenings: e.target.value })} placeholder="e.g. 3" />
          </label>
          <label>
            Minimum experience (years)
            <input min="0" step="0.5" type="number" value={jobForm.minExperience} onChange={(e) => setJobForm({ ...jobForm, minExperience: e.target.value })} placeholder="e.g. 0" />
          </label>
          <label>
            Maximum experience (years)
            <input min="0" step="0.5" type="number" value={jobForm.maxExperience} onChange={(e) => setJobForm({ ...jobForm, maxExperience: e.target.value })} placeholder="e.g. 2" />
          </label>
          <label>
            Salary range / CTC
            <input value={jobForm.salaryRange} onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })} placeholder="e.g. ₹5–8 LPA" />
          </label>
          <label>
            Education qualification
            <input value={jobForm.educationQualification} onChange={(e) => setJobForm({ ...jobForm, educationQualification: e.target.value })} placeholder="e.g. B.E / B.Tech / MCA" />
          </label>
          <label>
            Preferred degree
            <input value={jobForm.preferredDegree} onChange={(e) => setJobForm({ ...jobForm, preferredDegree: e.target.value })} placeholder="Optional" />
          </label>
          <label>
            Certifications
            <input value={jobForm.certifications} onChange={(e) => setJobForm({ ...jobForm, certifications: e.target.value })} placeholder="Optional" />
          </label>
          <label>
            Application deadline
            <input type="date" value={jobForm.applicationDeadline} onChange={(e) => setJobForm({ ...jobForm, applicationDeadline: e.target.value })} />
          </label>
          <label>
            Expected joining date
            <input type="date" value={jobForm.expectedJoiningDate} onChange={(e) => setJobForm({ ...jobForm, expectedJoiningDate: e.target.value })} />
          </label>
          <label>
            Interview rounds
            <input min="1" type="number" value={jobForm.interviewRounds} onChange={(e) => setJobForm({ ...jobForm, interviewRounds: e.target.value })} placeholder="e.g. 3" />
          </label>
          <label>
            Recruiter/contact information
            <input value={jobForm.recruiterContact} onChange={(e) => setJobForm({ ...jobForm, recruiterContact: e.target.value })} placeholder="Email or phone" />
          </label>
          <label className="wide">
            Bonus or incentives
            <textarea value={jobForm.bonusIncentives} onChange={(e) => setJobForm({ ...jobForm, bonusIncentives: e.target.value })} placeholder="Optional bonus or incentive details" />
          </label>
          <label className="wide">
            Benefits
            <textarea value={jobForm.benefits} onChange={(e) => setJobForm({ ...jobForm, benefits: e.target.value })} placeholder="Health insurance, leave, equipment, etc." />
          </label>
          <label className="wide">
            Interview process
            <textarea value={jobForm.interviewProcess} onChange={(e) => setJobForm({ ...jobForm, interviewProcess: e.target.value })} placeholder="Interview stages and process" />
          </label>
          <label className="wide">
            Description
            <textarea
              value={jobForm.description}
              onChange={(e) =>
                setJobForm({ ...jobForm, description: e.target.value })
              }
              placeholder="Briefly describe this role."
            />
          </label>
          <div className="actions wide">
            <Button
              type="button"
              className="secondary"
              onClick={() => setJobFormOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={busy === "job"}>
                {busy === "job"
                  ? editingJob
                    ? "Updating…"
                    : "Creating…"
                  : editingJob
                    ? "Update job"
                    : "Create job"}
              </Button>
          </div>
        </form>
      </section>
    );
  }
