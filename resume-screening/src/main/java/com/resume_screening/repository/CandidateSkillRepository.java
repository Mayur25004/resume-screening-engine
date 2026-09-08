package com.resume_screening.repository;

import com.resume_screening.entity.CandidateSkill;
import com.resume_screening.entity.CandidateSkillId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidateSkillRepository
        extends JpaRepository<CandidateSkill, CandidateSkillId> {

    List<CandidateSkill> findByCandidateId(Integer candidateId);

    boolean existsByCandidateIdAndSkillId(
            Integer candidateId,
            Integer skillId
    );

    void deleteByCandidateId(Integer candidateId);
}
