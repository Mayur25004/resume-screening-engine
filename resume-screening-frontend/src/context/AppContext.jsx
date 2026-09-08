/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const API = "http://localhost:8080";
const USER_STORAGE_KEY = "resume-screening-user";

const normaliseJob = (job) => ({
  ...job,
  jobId: job.jobId ?? job.job_id,
  title: job.title ?? job.jobTitle,
});

const date = (value) =>
  value
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "—";

const AppContext = createContext(null);

function useAppState() {
  const [page, setPageState] = useState(() => {
    const existingState = window.history.state;

    if (!existingState?.resumeScreening) {
      const hasUser = !!localStorage.getItem(USER_STORAGE_KEY);

      window.history.replaceState(
        {
          resumeScreening: true,
          resumeScreeningAuth: hasUser ? "app" : "login",
          resumeScreeningPage: "dashboard",
          resumeScreeningCandidatePage: "dashboard",
        },
        "",
        window.location.href
      );
    }

    return window.history.state?.resumeScreeningPage || "dashboard";
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  });
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [candidatePage, setCandidatePageState] = useState(() => {
    return window.history.state?.resumeScreeningCandidatePage || "dashboard";
  });
  const setPage = useCallback((nextPage) => {
  setPageState(nextPage);

  window.history.pushState(
    {
      resumeScreeningPage: nextPage,
      resumeScreeningCandidatePage: candidatePage,
    },
    "",
    window.location.href
  );
}, [candidatePage]);

const setCandidatePage = useCallback((nextPage) => {
  setCandidatePageState(nextPage);

  window.history.pushState(
    {
      resumeScreeningPage: page,
      resumeScreeningCandidatePage: nextPage,
    },
    "",
    window.location.href
  );
}, [page]);
  const [jobSearch, setJobSearch] = useState("");
  const [jobs, setJobs] = useState([]),
  [candidates, setCandidates] = useState([]),
  [results, setResults] = useState([]),
  [applications, setApplications] = useState([]),
  [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(""),
    [notice, setNotice] = useState(null);
  const [jobFormOpen, setJobFormOpen] = useState(false),
  [candidateFormOpen, setCandidateFormOpen] = useState(false),
  [managedJob, setManagedJob] = useState(null),
  [jobSkills, setJobSkills] = useState([]),
  [jobDetailSkills, setJobDetailSkills] = useState([]),
  [jobDetails, setJobDetails] = useState(null),
  [editingJob, setEditingJob] = useState(null),
  [deleteJobTarget, setDeleteJobTarget] = useState(null);
  const [skillId, setSkillId] = useState(""),
    [mandatory, setMandatory] = useState(true),
    [candidateId, setCandidateId] = useState(""),
    [jobId, setJobId] = useState(""),
    [file, setFile] = useState(null),
    [candidateDetails, setCandidateDetails] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    department: "",
    jobType: "FULL_TIME",
    workMode: "ONSITE",
    numberOfOpenings: "",
    salaryRange: "",
    bonusIncentives: "",
    benefits: "",
    minExperience: "",
    maxExperience: "",
    educationQualification: "",
    preferredDegree: "",
    certifications: "",
    applicationDeadline: "",
    expectedJoiningDate: "",
    interviewProcess: "",
    interviewRounds: "",
    recruiterContact: "",
  });
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentTitle: "",
    experienceYears: "",
  });
  const [profileEditing, setProfileEditing] = useState(false);

const [profileForm, setProfileForm] = useState({
  name: "",
  email: "",
  phone: "",
  currentTitle: "",
  experienceYears: "",
});
  const fileInput = useRef(null);
  const message = (type, text) => setNotice({ type, text });
  const request = useCallback(async (path, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed (${response.status})`);
  }

  return response.status === 204
    ? null
    : response.json();
}, []);


  const load = useCallback(async () => {
  setLoading(true);

  try {
    const isCandidate =
  currentUser?.role?.toUpperCase() === "CANDIDATE";

const [j, c, r, a, s] = await Promise.all([
  request("/jobs"),
  request(isCandidate ? "/candidates/me" : "/candidates"),
  request(isCandidate ? "/screening-results/my" : "/screening-results"),
  isCandidate ? request("/applications/my") : request("/applications"),
  request("/skills"),
]);

    const candidateList = Array.isArray(c) ? c : c ? [c] : [];

    setJobs((j || []).map(normaliseJob));
    setCandidates(candidateList);
    setResults(r || []);
    setApplications(a || []);
    setSkills(s || []);

    if (
      currentUser?.role?.toUpperCase() === "CANDIDATE" &&
      c
    ) {
      setCandidateId(String(c.candidateId));
    }

  } catch (error) {
    console.error("API ERROR:", error);

    message(
      "error",
      error.message || "Could not load data from the API."
    );
  } finally {
    setLoading(false);
  }
}, [request, currentUser]);
  useEffect(() => {
    if (currentUser) load();
    else setLoading(false);
  }, [currentUser, load]);
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;

      // Browser Back from the application should return to the login screen.
      if (state?.resumeScreeningAuth === "login") {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem("token");

        setCurrentUser(null);
        setAuthMode("login");
        setAuthError("");
        setPageState("dashboard");
        setCandidatePageState("dashboard");
        return;
      }

      if (state?.resumeScreeningAuth === "app") {
        if (state.resumeScreeningPage) {
          setPageState(state.resumeScreeningPage);
        }

        if (state.resumeScreeningCandidatePage) {
          setCandidatePageState(state.resumeScreeningCandidatePage);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  const candidatesById = useMemo(
    () => new Map(candidates.map((c) => [c.candidateId, c])),
    [candidates],
  );
  const jobsById = useMemo(
    () => new Map(jobs.map((j) => [j.jobId, j])),
    [jobs],
  );
  const errorText = (error, fallback) => error.message || fallback;

  async function submitJob(event) {
  event.preventDefault();
  setBusy("job");

  try {
    const savedJob = await request(
  editingJob ? `/jobs/${editingJob.jobId}` : "/jobs",
  {
    method: editingJob ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: jobForm.title.trim(),
        description: jobForm.description.trim(),
        location: jobForm.location.trim(),
        department: jobForm.department.trim(),
        jobType: jobForm.jobType,
        workMode: jobForm.workMode,
        numberOfOpenings: jobForm.numberOfOpenings ? Number(jobForm.numberOfOpenings) : null,
        salaryRange: jobForm.salaryRange.trim(),
        bonusIncentives: jobForm.bonusIncentives.trim(),
        benefits: jobForm.benefits.trim(),
        minExperience: jobForm.minExperience ? Number(jobForm.minExperience) : null,
        maxExperience: jobForm.maxExperience ? Number(jobForm.maxExperience) : null,
        educationQualification: jobForm.educationQualification.trim(),
        preferredDegree: jobForm.preferredDegree.trim(),
        certifications: jobForm.certifications.trim(),
        applicationDeadline: jobForm.applicationDeadline || null,
        expectedJoiningDate: jobForm.expectedJoiningDate || null,
        interviewProcess: jobForm.interviewProcess.trim(),
        interviewRounds: jobForm.interviewRounds ? Number(jobForm.interviewRounds) : null,
        recruiterContact: jobForm.recruiterContact.trim(),
      }),
    });

    setJobForm({
      title: "",
      description: "",
      location: "",
      department: "",
      jobType: "FULL_TIME",
      workMode: "ONSITE",
      numberOfOpenings: "",
      salaryRange: "",
      bonusIncentives: "",
      benefits: "",
      minExperience: "",
      maxExperience: "",
      educationQualification: "",
      preferredDegree: "",
      certifications: "",
      applicationDeadline: "",
      expectedJoiningDate: "",
      interviewProcess: "",
      interviewRounds: "",
      recruiterContact: "",
    });

    setJobFormOpen(false);

await load();

if (editingJob) {
  setEditingJob(null);
  message("success", "Job updated successfully.");
} else {
  setManagedJob(normaliseJob(savedJob));
  setJobSkills([]);
  message("success", "Job created. Now add the required skills.");
}

  } catch (error) {
    message(
      "error",
      errorText(error, "Unable to create job.")
    );
  } finally {
    setBusy("");
  }
}
  async function submitAuth(event) {
    event.preventDefault();
    setAuthError("");
    setAuthBusy(true);
    try {
      const isLogin = authMode === "login";
      const user = await request(isLogin ? "/auth/login" : "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email: authForm.email.trim(), password: authForm.password }
            : {
                name: authForm.name.trim(),
                email: authForm.email.trim(),
                password: authForm.password,
              },
        ),
      });
      if (!isLogin) {
        setAuthMode("login");
        setAuthForm({ ...authForm, password: "" });
        setAuthError("Registration successful. Please sign in.");
        return;
      }
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      if (user.token) {
        localStorage.setItem("token", user.token);
      }

      setCurrentUser(user);

      // Create the authenticated history entry after login.
      window.history.pushState(
        {
          resumeScreening: true,
          resumeScreeningAuth: "app",
          resumeScreeningPage: "dashboard",
          resumeScreeningCandidatePage: "dashboard",
        },
        "",
        window.location.href
      );
    } catch (error) {
      setAuthError(
        authMode === "login"
          ? "Invalid email or password. Please try again."
          : errorText(error, "Registration failed. Please try again."),
      );
    } finally {
      setAuthBusy(false);
    }
  }
  function logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("token");

    setCurrentUser(null);
    setAuthMode("login");
    setAuthError("");

    setPageState("dashboard");
    setCandidatePageState("dashboard");

    // Replace the current authenticated entry with the login state.
    window.history.replaceState(
      {
        resumeScreening: true,
        resumeScreeningAuth: "login",
        resumeScreeningPage: "dashboard",
        resumeScreeningCandidatePage: "dashboard",
      },
      "",
      window.location.href
    );
  }
  async function submitCandidate(event) {
    event.preventDefault();
    setBusy("candidate");
    try {
      await request("/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...candidateForm,
          name: candidateForm.name.trim(),
          email: candidateForm.email.trim(),
          experienceYears: candidateForm.experienceYears || null,
        }),
      });
      setCandidateForm({
        name: "",
        email: "",
        phone: "",
        currentTitle: "",
        experienceYears: "",
      });
      setCandidateFormOpen(false);
      await load();
      message("success", "Candidate added.");
    } catch (error) {
      message("error", errorText(error, "Unable to add candidate."));
    } finally {
      setBusy("");
    }
  }
  function startEditingJob(job) {
  setEditingJob(job);

  setJobForm({
    title: job.title || "",
    description: job.description || "",
    location: job.location || "",
    department: job.department || "",
    jobType: job.jobType || "FULL_TIME",
    workMode: job.workMode || "ONSITE",
    numberOfOpenings: job.numberOfOpenings ?? "",
    salaryRange: job.salaryRange || "",
    bonusIncentives: job.bonusIncentives || "",
    benefits: job.benefits || "",
    minExperience: job.minExperience ?? "",
    maxExperience: job.maxExperience ?? "",
    educationQualification: job.educationQualification || "",
    preferredDegree: job.preferredDegree || "",
    certifications: job.certifications || "",
    applicationDeadline: job.applicationDeadline || "",
    expectedJoiningDate: job.expectedJoiningDate || "",
    interviewProcess: job.interviewProcess || "",
    interviewRounds: job.interviewRounds ?? "",
    recruiterContact: job.recruiterContact || "",
  });

  setJobFormOpen(true);
}
  async function manageSkills(job) {
    setManagedJob(job);
    setJobSkills([]);
    try {
      setJobSkills((await request(`/jobs/${job.jobId}/skills`)) || []);
    } catch (error) {
      message("error", errorText(error, "Unable to load skill requirements."));
    }
  }
  async function openJobDetails(job) {
  setJobDetails(job);
  setJobDetailSkills([]);

  try {
    setJobDetailSkills(
      (await request(`/jobs/${job.jobId}/skills`)) || []
    );
  } catch (error) {
    message("error", errorText(error, "Unable to load job skills."));
  }
}
  async function addSkill() {
  if (!skillId.trim()) {
    return message("error", "Enter a skill first.");
  }

  const typedSkill = skillId.trim();

  const selectedSkill = skills.find(
    (s) => s.skillName?.toLowerCase() === typedSkill.toLowerCase()
  );

  setBusy("skill");

  try {
    // Existing catalog entries are reused; otherwise the entered skill is
    // created and then attached to this job requirement.
    const skill = selectedSkill || await request("/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillName: typedSkill, category: "Custom" }),
    });

    const alreadyAdded = jobSkills.some(
      (x) => Number(x.skillId) === Number(skill.skillId)
    );

    if (alreadyAdded) {
      message("error", "This skill is already added.");
      return;
    }

    await request("/job-skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: managedJob.jobId,
        skillId: Number(skill.skillId),
        mandatory,
      }),
    });

    setSkillId("");

    if (!selectedSkill) {
      setSkills((currentSkills) => [...currentSkills, skill]);
    }

    setJobSkills(
      (await request(`/jobs/${managedJob.jobId}/skills`)) || []
    );

    message("success", "Skill requirement added.");
  } catch (error) {
    message("error", errorText(error, "Unable to add skill."));
  } finally {
    setBusy("");
  }
}
  async function updateProfile() {
  if (!candidateId) return;

  setBusy("profile");

  try {
    await request(`/candidates/${candidateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
        phone: profileForm.phone.trim(),
        currentTitle: profileForm.currentTitle.trim(),
        experienceYears: profileForm.experienceYears || null,
      }),
    });

    setProfileEditing(false);

    await load();

    message("success", "Profile updated successfully.");
  } catch (error) {
    message(
      "error",
      errorText(error, "Unable to update profile.")
    );
  } finally {
    setBusy("");
  }
}
  async function upload() {
    if (!candidateId || !file)
      return message("error", "Select a candidate and a PDF resume first.");
    setBusy("upload");
    try {
      const form = new FormData();
      form.append("file", file);
      await request(`/candidates/${candidateId}/resume`, {
        method: "POST",
        body: form,
      });
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      await load();
      message("success", "Resume uploaded and processed.");
    } catch (error) {
      message("error", errorText(error, "Resume upload failed."));
    } finally {
      setBusy("");
    }
  }
  
  const activeCandidate = candidatesById.get(Number(candidateId));
  const myResults = results.filter(
    (result) => Number(result.candidateId) === Number(candidateId),
  );
  const myApplications = applications.filter(
    (application) =>
      Number(application.candidateId) === Number(candidateId),
  );

  const applyToJob = async (jobId) => {
    try {
      await request(`/applications?jobId=${jobId}`, {
        method: "POST",
      });

      await load();
      message("success", "Application submitted successfully");
    } catch (error) {
      console.error(error);
      message(
        "error",
        error.message || "Could not apply for this job"
      );
    }
  };

  async function updateApplicationStatus(applicationId, status) {
    try {
      await request(
        `/applications/${applicationId}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PUT",
        },
      );

      await load();
      message("success", "Application status updated successfully");
    } catch (error) {
      console.error(error);
      message("error", error.message || "Could not update application status");
    }
  }

  return {
    page, setPage, currentUser, setCurrentUser, authMode, setAuthMode,
    authForm, setAuthForm, authError, setAuthError, authBusy, setAuthBusy,
    candidatePage, setCandidatePage, jobSearch, setJobSearch,
    jobs, setJobs, candidates, setCandidates, results, setResults,
    applications, setApplications, skills, setSkills, loading, setLoading,
    busy, setBusy, notice, setNotice, jobFormOpen, setJobFormOpen,
    candidateFormOpen, setCandidateFormOpen, managedJob, setManagedJob,
    jobSkills, setJobSkills, jobDetailSkills, setJobDetailSkills,
    jobDetails, setJobDetails, editingJob, setEditingJob,
    deleteJobTarget, setDeleteJobTarget, skillId, setSkillId,
    mandatory, setMandatory, candidateId, setCandidateId, jobId, setJobId,
    file, setFile, candidateDetails, setCandidateDetails,
    jobForm, setJobForm, candidateForm, setCandidateForm,
    profileEditing, setProfileEditing, profileForm, setProfileForm,
    fileInput, message, request, load, candidatesById, jobsById, errorText,
    submitJob, submitAuth, logout, submitCandidate, startEditingJob,
    manageSkills, openJobDetails, addSkill, updateProfile, upload,
    activeCandidate, myResults, myApplications, applyToJob,
    updateApplicationStatus, normaliseJob, date, API,
  };
}

export function AppProvider({ children }) {
  return <AppContext.Provider value={useAppState()}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
