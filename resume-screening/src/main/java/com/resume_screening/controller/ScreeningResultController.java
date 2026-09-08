package com.resume_screening.controller;

import com.resume_screening.entity.ScreeningResult;
import com.resume_screening.service.ScreeningResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ScreeningResultController {

    private final ScreeningResultService screeningResultService;

    public ScreeningResultController(
            ScreeningResultService screeningResultService) {

        this.screeningResultService = screeningResultService;
    }

    // Get all screening results
    @GetMapping("/screening-results")
    public List<ScreeningResult> getAllResults() {
        return screeningResultService.getAllResults();
    }

    @GetMapping("/screening-results/my")
    public List<ScreeningResult> getMyResults(Authentication authentication) {
        return screeningResultService.getMyResults(authentication.getName());
    }

    // Get results for a candidate
    @GetMapping("/candidates/{candidateId}/screening-results")
    public List<ScreeningResult> getResultsByCandidate(
            @PathVariable Integer candidateId) {

        return screeningResultService.getResultsByCandidate(candidateId);
    }

    // Get results for a job
    @GetMapping("/jobs/{jobId}/screening-results")
    public List<ScreeningResult> getResultsByJob(
            @PathVariable Integer jobId) {

        return screeningResultService.getResultsByJob(jobId);
    }
}
