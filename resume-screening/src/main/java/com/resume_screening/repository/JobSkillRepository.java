package com.resume_screening.repository;

import com.resume_screening.entity.JobSkill;
import com.resume_screening.entity.JobSkillId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobSkillRepository
        extends JpaRepository<JobSkill, JobSkillId> {
    List<JobSkill> findByJobId(Integer jobId);

}
