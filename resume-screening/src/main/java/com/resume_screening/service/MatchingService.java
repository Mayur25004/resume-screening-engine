package com.resume_screening.service;

import com.resume_screening.entity.CandidateSkill;
import com.resume_screening.entity.JobSkill;
import com.resume_screening.repository.CandidateSkillRepository;
import com.resume_screening.repository.JobSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchingService {

    private final CandidateSkillRepository candidateSkillRepository;
    private final JobSkillRepository jobSkillRepository;

    public MatchingService(
            CandidateSkillRepository candidateSkillRepository,
            JobSkillRepository jobSkillRepository) {

        this.candidateSkillRepository = candidateSkillRepository;
        this.jobSkillRepository = jobSkillRepository;
    }

    public double calculateScore(Integer candidateId, Integer jobId) {

        List<CandidateSkill> candidateSkills =
                candidateSkillRepository.findByCandidateId(candidateId);

        List<JobSkill> jobSkills =
                jobSkillRepository.findByJobId(jobId);

        if (jobSkills.isEmpty()) {
            return 0.0;
        }

        int mandatoryTotal = 0;
        int mandatoryMatched = 0;

        int optionalTotal = 0;
        int optionalMatched = 0;

        for (JobSkill jobSkill : jobSkills) {

            boolean matched = false;

            for (CandidateSkill candidateSkill : candidateSkills) {

                if (jobSkill.getSkillId()
                        .equals(candidateSkill.getSkillId())) {

                    matched = true;
                    break;
                }
            }

            if (jobSkill.getMandatory()) {

                mandatoryTotal++;

                if (matched) {
                    mandatoryMatched++;
                }

            } else {

                optionalTotal++;

                if (matched) {
                    optionalMatched++;
                }
            }
        }

        double mandatoryScore = 0.0;
        double optionalScore = 0.0;

        if (mandatoryTotal > 0) {
            mandatoryScore =
                    ((double) mandatoryMatched / mandatoryTotal) * 80;
        }

        if (optionalTotal > 0) {
            optionalScore =
                    ((double) optionalMatched / optionalTotal) * 20;
        }

        return mandatoryScore + optionalScore;
    }
}