package com.resume_screening.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "screening_result")
public class ScreeningResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Integer resultId;

    @Column(name = "candidate_id")
    private Integer candidateId;

    @Column(name = "job_id")
    private Integer jobId;

    @Column(name = "matching_score")
    private BigDecimal matchingScore;

    @Column(name = "status")
    private String status;

    @Column(name = "screened_at", insertable = false, updatable = false)
    private LocalDateTime screenedAt;

    @Column(name = "notes")
    private String notes;

    public ScreeningResult() {
    }

    public Integer getResultId() {
        return resultId;
    }

    public void setResultId(Integer resultId) {
        this.resultId = resultId;
    }

    public Integer getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Integer candidateId) {
        this.candidateId = candidateId;
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public BigDecimal getMatchingScore() {
        return matchingScore;
    }

    public void setMatchingScore(BigDecimal matchingScore) {
        this.matchingScore = matchingScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getScreenedAt() {
        return screenedAt;
    }

    public void setScreenedAt(LocalDateTime screenedAt) {
        this.screenedAt = screenedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}