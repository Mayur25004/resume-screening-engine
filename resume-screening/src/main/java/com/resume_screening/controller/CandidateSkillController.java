package com.resume_screening.controller;

import com.resume_screening.entity.CandidateSkill;
import com.resume_screening.service.CandidateSkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CandidateSkillController {

    private final CandidateSkillService candidateSkillService;

    public CandidateSkillController(CandidateSkillService candidateSkillService) {
        this.candidateSkillService = candidateSkillService;
    }

    @GetMapping("/candidate-skills")
    public List<CandidateSkill> getAllCandidateSkills() {
        return candidateSkillService.getAllCandidateSkills();
    }

    @PostMapping("/candidate-skills")
    public CandidateSkill addCandidateSkill(
            @RequestBody CandidateSkill candidateSkill) {

        return candidateSkillService.addCandidateSkill(candidateSkill);
    }

    @GetMapping("/candidates/{candidateId}/skills")
    public List<CandidateSkill> getSkillsByCandidate(
            @PathVariable Integer candidateId) {

        return candidateSkillService.getSkillsByCandidate(candidateId);
    }
}