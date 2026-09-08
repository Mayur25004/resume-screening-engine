import { useApp } from "../../context/AppContext";
import Header from "../../components/common/Header.jsx";
import Button from "../../components/common/Button.jsx";
import Empty from "../../components/common/Empty.jsx";

export default function MyProfile() {
  const {
    busy, profileEditing, setProfileEditing, profileForm, setProfileForm, updateProfile, activeCandidate
  } = useApp();
  function startEditing() {
    setProfileForm({
      name: activeCandidate.name || "",
      email: activeCandidate.email || "",
      phone: activeCandidate.phone || "",
      currentTitle: activeCandidate.currentTitle || "",
      experienceYears: activeCandidate.experienceYears || "",
    });

    setProfileEditing(true);
  }

  return (
    <>
      <Header eyebrow="Your details" title="My profile">
        Manage your candidate profile information.
      </Header>

      {activeCandidate ? (
        profileEditing ? (
          <section className="card profile-card profile-edit-card">
            <div className="profile-edit-header">
              <div>
                <h2>Edit profile</h2>
                <p>Update your personal and professional information.</p>
              </div>
            </div>

            <div className="profile-form">
              <label>
                Full name
                <input
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={profileForm.email}
                  disabled
                />
                <small>Email is linked to your account.</small>
              </label>

              <label>
                Phone
                <input
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      phone: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Current title
                <input
                  value={profileForm.currentTitle}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      currentTitle: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Experience (years)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={profileForm.experienceYears}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      experienceYears: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="profile-actions">
              <Button
                type="button"
                className="secondary"
                onClick={() => setProfileEditing(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={busy === "profile"}
                onClick={updateProfile}
              >
                {busy === "profile" ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </section>
        ) : (
          <section className="card profile-card">
            <i>{activeCandidate.name?.[0]?.toUpperCase()}</i>

            <div className="profile-content">
              <div className="profile-heading">
                <div>
                  <h2>{activeCandidate.name}</h2>
                  <p>{activeCandidate.currentTitle || "Candidate"}</p>
                </div>

                <Button
                  className="secondary"
                  onClick={startEditing}
                >
                  ✎ Edit profile
                </Button>
              </div>

              <small>{activeCandidate.email}</small>

              <small>
                {activeCandidate.phone || "Phone number not added"}
              </small>

              <small>
                {activeCandidate.experienceYears
                  ? `${activeCandidate.experienceYears} years of experience`
                  : "Experience not listed"}
              </small>
            </div>
          </section>
        )
      ) : (
        <Empty
          title="Candidate profile not found"
          detail="Your account is not linked to a candidate profile yet."
        />
      )}
    </>
  );
}
