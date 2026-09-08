import { useApp } from "../../context/AppContext";
import Button from "../common/Button.jsx";

export default function Skills() {
  const {
    skills, busy, managedJob, setManagedJob, jobSkills, skillId, setSkillId, mandatory, setMandatory, addSkill
  } = useApp();
    if (!managedJob) return null;
    return (
      <section className="card form-card">
        <div className="heading">
          <div>
            <h2>
              {managedJob.title} <span>Requirements</span>
            </h2>
            <p>Mandatory skills contribute to the screening match.</p>
          </div>
          <button className="close" onClick={() => setManagedJob(null)}>
            ×
          </button>
        </div>
        <div className="skill-add">
          <input
            value={skillId}
            onChange={(e) => setSkillId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Type an existing skill or create a new one"
          />

          <select
            value={mandatory}
            onChange={(e) => setMandatory(e.target.value === "true")}
          >
            <option value="true">Mandatory</option>
            <option value="false">Optional</option>
          </select>

          <Button disabled={busy === "skill"} onClick={addSkill}>
            {busy === "skill" ? "Adding…" : "Add skill"}
          </Button>
        </div>
        <div className="skill-list">
          {jobSkills.length ? (
            jobSkills.map((x) => {
              const skill = skills.find((s) => s.skillId === x.skillId);
              return (
                <div className="skill" key={`${x.jobId}-${x.skillId}`}>
                  <div>
                    <strong>{skill?.skillName || `Skill #${x.skillId}`}</strong>
                    <small>{skill?.category || "Uncategorized"}</small>
                  </div>
                  <b className={x.mandatory ? "required" : "optional"}>
                    {x.mandatory ? "Mandatory" : "Optional"}
                  </b>
                </div>
              );
            })
          ) : (
            <p className="quiet">No skills have been added to this role.</p>
          )}
        </div>
      </section>
    );
  }
