# Resume Screening Engine — Frontend

React + Vite frontend for the Resume Screening Engine.

## Project Structure

```text
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Empty.jsx
│   │   ├── Header.jsx
│   │   └── Table.jsx
│   ├── admin/
│   │   ├── CandidateForm.jsx
│   │   ├── JobDetails.jsx
│   │   ├── JobForm.jsx
│   │   └── Skills.jsx
│   └── candidate/
│       └── Applications.jsx
├── context/
│   └── AppContext.jsx
├── pages/
│   ├── admin/
│   │   ├── ApplicationsAdmin.jsx
│   │   ├── Candidates.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Jobs.jsx
│   │   ├── Results.jsx
│   │   └── Screening.jsx
│   ├── candidate/
│   │   ├── CandidateDashboard.jsx
│   │   ├── FindJobs.jsx
│   │   ├── MyApplications.jsx
│   │   ├── MyProfile.jsx
│   │   └── MyResume.jsx
│   └── Auth.jsx
├── assets/
├── App.jsx
├── App.css
├── Auth.css
├── RolePortal.css
├── index.css
└── main.jsx
```

## Setup

```bash
npm install
npm run dev
```

The frontend expects the Spring Boot backend at:

```text
http://localhost:8080
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Notes

- Admin and candidate portal pages are separated under `pages/`.
- Reusable UI elements are under `components/common/`.
- Admin-specific forms and job-management components are under `components/admin/`.
- Candidate-specific reusable UI is under `components/candidate/`.
- Shared application state, API requests, authentication state, and handlers are centralized in `context/AppContext.jsx`.
- Existing application behaviour and API endpoint paths were preserved while organizing the frontend.
