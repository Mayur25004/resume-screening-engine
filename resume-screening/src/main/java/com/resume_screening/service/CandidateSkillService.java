package com.resume_screening.service;

import com.resume_screening.entity.CandidateSkill;
import com.resume_screening.entity.Skill;
import com.resume_screening.repository.CandidateSkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CandidateSkillService {

    private final CandidateSkillRepository candidateSkillRepository;

    public CandidateSkillService(CandidateSkillRepository candidateSkillRepository) {
        this.candidateSkillRepository = candidateSkillRepository;
    }

    public List<CandidateSkill> getAllCandidateSkills() {
        return candidateSkillRepository.findAll();
    }

    public CandidateSkill addCandidateSkill(CandidateSkill candidateSkill) {
        return candidateSkillRepository.save(candidateSkill);
    }

    public List<CandidateSkill> getSkillsByCandidate(Integer candidateId) {
        return candidateSkillRepository.findByCandidateId(candidateId);
    }

    // Save skills detected automatically from the resume
    @Transactional
    public void replaceDetectedSkills(
            Integer candidateId,
            List<Skill> detectedSkills) {

        candidateSkillRepository.deleteByCandidateId(candidateId);

        for (Skill skill : detectedSkills) {
            CandidateSkill candidateSkill = new CandidateSkill();
            candidateSkill.setCandidateId(candidateId);
            candidateSkill.setSkillId(skill.getSkillId());
            candidateSkill.setProficiencyLevel("UNKNOWN");
            candidateSkillRepository.save(candidateSkill);
        }
    }
}
