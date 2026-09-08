import { useApp } from "../../context/AppContext";
import Button from "../common/Button.jsx";

export default function CandidateForm() {
  const {
    busy, setCandidateFormOpen, candidateForm, setCandidateForm, submitCandidate
  } = useApp();
    return (
      <section className="card form-card">
        <div className="heading">
          <div>
            <h2>Add candidate</h2>
            <p>Upload a resume once their profile is created.</p>
          </div>
          <button className="close" onClick={() => setCandidateFormOpen(false)}>
            ×
          </button>
        </div>
        <form className="form-grid" onSubmit={submitCandidate}>
          <label>
            Full name
            <input
              required
              value={candidateForm.name}
              onChange={(e) =>
                setCandidateForm({ ...candidateForm, name: e.target.value })
              }
              placeholder="Candidate name"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={candidateForm.email}
              onChange={(e) =>
                setCandidateForm({ ...candidateForm, email: e.target.value })
              }
              placeholder="name@email.com"
            />
          </label>
          <label>
            Current title
            <input
              value={candidateForm.currentTitle}
              onChange={(e) =>
                setCandidateForm({
                  ...candidateForm,
                  currentTitle: e.target.value,
                })
              }
              placeholder="e.g. Software Engineer"
            />
          </label>
          <label>
            Experience (years)
            <input
              min="0"
              step=".5"
              type="number"
              value={candidateForm.experienceYears}
              onChange={(e) =>
                setCandidateForm({
                  ...candidateForm,
                  experienceYears: e.target.value,
                })
              }
            />
          </label>
          <label className="wide">
            Phone
            <input
              value={candidateForm.phone}
              onChange={(e) =>
                setCandidateForm({ ...candidateForm, phone: e.target.value })
              }
              placeholder="Optional"
            />
          </label>
          <div className="actions wide">
            <Button
              type="button"
              className="secondary"
              onClick={() => setCandidateFormOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={busy === "candidate"}>
              {busy === "candidate" ? "Adding…" : "Add candidate"}
            </Button>
          </div>
        </form>
      </section>
    );
  }
