package com.resume_screening.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name="job_id")
    private Integer job_id;
    @Column(name="title")
    private String title;
    private String description;

    private String location;
    private String department;
    @Column(name = "job_type")
    private String jobType;
    @Column(name = "work_mode")
    private String workMode;
    @Column(name = "number_of_openings")
    private Integer numberOfOpenings;
    @Column(name = "salary_range")
    private String salaryRange;
    @Column(name = "bonus_incentives", columnDefinition = "TEXT")
    private String bonusIncentives;
    @Column(columnDefinition = "TEXT")
    private String benefits;
    @Column(name = "min_experience")
    private BigDecimal minExperience;
    @Column(name = "max_experience")
    private BigDecimal maxExperience;
    @Column(name = "education_qualification")
    private String educationQualification;
    @Column(name = "preferred_degree")
    private String preferredDegree;
    @Column(columnDefinition = "TEXT")
    private String certifications;
    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;
    @Column(name = "expected_joining_date")
    private LocalDate expectedJoiningDate;
    @Column(name = "interview_process", columnDefinition = "TEXT")
    private String interviewProcess;
    @Column(name = "interview_rounds")
    private Integer interviewRounds;
    @Column(name = "recruiter_contact")
    private String recruiterContact;

    /// ////////////////////////////////
    @ManyToOne
    @JoinColumn(name="created_by")
    private User createdBy;

    @Column(name = "status")
    private String status = "OPEN";

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    /// ///////////////////////////////////////////f
    public Job() {
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public String getExperienceRequired() {
//        return experienceRequired;
//    }
//
//    public void setExperienceRequired(String experienceRequired) {
//        this.experienceRequired = experienceRequired;
//    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }
    public String getWorkMode() { return workMode; }
    public void setWorkMode(String workMode) { this.workMode = workMode; }
    public Integer getNumberOfOpenings() { return numberOfOpenings; }
    public void setNumberOfOpenings(Integer numberOfOpenings) { this.numberOfOpenings = numberOfOpenings; }
    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }
    public String getBonusIncentives() { return bonusIncentives; }
    public void setBonusIncentives(String bonusIncentives) { this.bonusIncentives = bonusIncentives; }
    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }
    public BigDecimal getMinExperience() { return minExperience; }
    public void setMinExperience(BigDecimal minExperience) { this.minExperience = minExperience; }
    public BigDecimal getMaxExperience() { return maxExperience; }
    public void setMaxExperience(BigDecimal maxExperience) { this.maxExperience = maxExperience; }
    public String getEducationQualification() { return educationQualification; }
    public void setEducationQualification(String educationQualification) { this.educationQualification = educationQualification; }
    public String getPreferredDegree() { return preferredDegree; }
    public void setPreferredDegree(String preferredDegree) { this.preferredDegree = preferredDegree; }
    public String getCertifications() { return certifications; }
    public void setCertifications(String certifications) { this.certifications = certifications; }
    public LocalDate getApplicationDeadline() { return applicationDeadline; }
    public void setApplicationDeadline(LocalDate applicationDeadline) { this.applicationDeadline = applicationDeadline; }
    public LocalDate getExpectedJoiningDate() { return expectedJoiningDate; }
    public void setExpectedJoiningDate(LocalDate expectedJoiningDate) { this.expectedJoiningDate = expectedJoiningDate; }
    public String getInterviewProcess() { return interviewProcess; }
    public void setInterviewProcess(String interviewProcess) { this.interviewProcess = interviewProcess; }
    public Integer getInterviewRounds() { return interviewRounds; }
    public void setInterviewRounds(Integer interviewRounds) { this.interviewRounds = interviewRounds; }
    public String getRecruiterContact() { return recruiterContact; }
    public void setRecruiterContact(String recruiterContact) { this.recruiterContact = recruiterContact; }
}
