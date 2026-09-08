package com.resume_screening.service;

import com.resume_screening.entity.Candidate;
import com.resume_screening.entity.ScreeningResult;
import com.resume_screening.repository.CandidateRepository;
import com.resume_screening.repository.ScreeningResultRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ScreeningResultService {

    private final ScreeningResultRepository screeningResultRepository;
    private final MatchingService matchingService;
    private final CandidateRepository candidateRepository;

    public ScreeningResultService(
            ScreeningResultRepository screeningResultRepository,
            MatchingService matchingService, CandidateRepository candidateRepository) {

        this.screeningResultRepository = screeningResultRepository;
        this.matchingService = matchingService;
        this.candidateRepository = candidateRepository;
    }

    // Get all screening results
    public List<ScreeningResult> getAllResults() {
        return screeningResultRepository.findAll();
    }

    // Screen a candidate for a job
    public ScreeningResult screenCandidate(
            Integer candidateId,
            Integer jobId) {

        double score =
                matchingService.calculateScore(candidateId, jobId);

        ScreeningResult result =
                screeningResultRepository
                        .findTopByCandidateIdAndJobIdOrderByResultIdDesc(
                                candidateId,
                                jobId
                        )
                        .orElse(new ScreeningResult());

        result.setCandidateId(candidateId);
        result.setJobId(jobId);
        result.setMatchingScore(BigDecimal.valueOf(score));

        if (score >= 80) {
            result.setStatus("SHORTLISTED");
        } else if (score >= 60) {
            result.setStatus("MAYBE");
        } else {
            result.setStatus("REJECTED");
        }

        result.setNotes("Screening completed automatically.");

        return screeningResultRepository.save(result);
    }

    // Get results for a candidate
    public List<ScreeningResult> getResultsByCandidate(
            Integer candidateId) {

        return screeningResultRepository.findByCandidateId(candidateId);
    }

    public List<ScreeningResult> getMyResults(String email) {
        Candidate candidate = candidateRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
        return screeningResultRepository.findByCandidateId(candidate.getCandidateId());
    }

    // Get results for a job
    public List<ScreeningResult> getResultsByJob(
            Integer jobId) {

        return screeningResultRepository.findByJobId(jobId);
    }

}
