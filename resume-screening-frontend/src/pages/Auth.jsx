import { useApp } from "../context/AppContext";
import Button from "../components/common/Button.jsx";

export default function AuthPage() {
  const {
    authMode, setAuthMode, authForm, setAuthForm, authError, setAuthError, authBusy,
    submitAuth,
  } = useApp();

  return (
<div className="auth-screen">
        <section className="auth-card">
          <div className="landing-brand">
            <i>r/</i>
            <strong>
              resume<span>flow</span>
            </strong>
          </div>
          <span className="eyebrow">
            {authMode === "login" ? "Welcome back" : "Create your account"}
          </span>
          <h1>
            {authMode === "login"
              ? "Sign in to your workspace"
              : "Join ResumeFlow"}
          </h1>
          <p>
            {authMode === "login"
              ? "Use your account to access the correct portal."
              : "Choose your role and start using the platform."}
          </p>
          <form onSubmit={submitAuth} className="auth-form">
            {authMode === "register" && (
              <>
                <label>
                  Name
                  <input
                    required
                    value={authForm.name}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, name: e.target.value })
                    }
                    placeholder="Your full name"
                  />
                </label>
              </>
            )}
            <label>
              Email
              <input
                required
                type="email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm({ ...authForm, email: e.target.value })
                }
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                required
                minLength="6"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$"
                title="Password must be at least 6 characters and contain one uppercase letter, one lowercase letter, and one special symbol."
                type="password"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm({ ...authForm, password: e.target.value })
                }
                placeholder="Enter your password"
              />
              {authMode === "register" && (
                <small className="password-hint">
                  Password must be at least 6 characters and contain one uppercase letter,
                  one lowercase letter, and one special symbol.
                </small>
              )}
            </label>
            {authError && (
              <p
                className={
                  authError.startsWith("Registration successful")
                    ? "auth-success"
                    : "auth-error"
                }
              >
                {authError}
              </p>
            )}
            <Button disabled={authBusy}>
              {authBusy
                ? "Please wait…"
                : authMode === "login"
                  ? "Sign in →"
                  : "Create account →"}
            </Button>
          </form>
          <button
            className="auth-switch"
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login");
              setAuthError("");
            }}
          >
            {authMode === "login"
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </section>
      </div>
    );
}
