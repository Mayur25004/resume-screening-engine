package com.resume_screening.controller;

import com.resume_screening.service.MatchingService;
import org.springframework.web.bind.annotation.*;

@RestController
public class MatchingController {

    private final MatchingService matchingService;

    public MatchingController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    @GetMapping("/match")
    public double calculateMatch(
            @RequestParam Integer candidateId,
            @RequestParam Integer jobId) {

        return matchingService.calculateScore(candidateId, jobId);
    }
}