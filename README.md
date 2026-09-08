# Resume Screening Engine

A full-stack web application for managing job openings, candidate applications, resumes, and resume screening.

## Features

- **Admin:** Create, edit and delete jobs, add required skills, manage applications and view screening results.
- **Candidate:** Browse jobs, view job details, apply for jobs, manage profile/resume and view application/screening status.
- JWT-based authentication with Admin and Candidate roles.
- Mandatory and optional job skills.
- Resume-to-job skill matching.

## Tech Stack

- **Frontend:** React, Vite, JavaScript, HTML, CSS
- **Backend:** Java 17, Spring Boot, Spring Security, JWT
- **Database:** MySQL
- **ORM:** Hibernate / Spring Data JPA
- **Build Tool:** Maven

## Project Structure

```text
resume-screening-engine/
├── frontend/
├── backend/
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mayur25004/resume-screening-engine.git
cd resume-screening-engine
```

### 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE resume_screening;
```

Update the database credentials in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/resume_screening
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend: `http://localhost:8080`

### 4. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Testing

### Admin

```text
Email: testadmin@gmail.com
Password: Admin@123
```

### Candidate

```text
Email: mayur2@gmail.com
Password: Mayur@123
```

If demo credentials are not publicly provided, create accounts locally and use the appropriate roles.

## Basic Workflow

```text
Admin creates Job
       ↓
Admin adds Required Skills
       ↓
Candidate views Job
       ↓
Candidate applies
       ↓
Candidate uploads Resume
       ↓
Resume Screening
       ↓
Skill Matching
       ↓
Screening Result
       ↓
Admin Review
```

## Database

Main tables:

```text
users
jobs
candidates
skills
job_skills
candidate_skills
applications
screening_result
```

## Future Improvements

- Advanced NLP resume parsing
- Semantic resume matching
- Resume ranking
- Recruiter analytics
- Email notifications
- Docker and cloud deployment

## Author

**Mayur Hotkar**

This project was developed as a full-stack learning and portfolio project.
