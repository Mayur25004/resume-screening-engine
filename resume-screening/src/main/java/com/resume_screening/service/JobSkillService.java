package com.resume_screening.service;

import com.resume_screening.entity.JobSkill;
import com.resume_screening.repository.JobSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobSkillService {

    private final JobSkillRepository jobSkillRepository;

    public JobSkillService(JobSkillRepository jobSkillRepository) {
        this.jobSkillRepository = jobSkillRepository;
    }

    // Get all job-skill relationships
    public List<JobSkill> getAllJobSkills() {
        return jobSkillRepository.findAll();
    }

    // Save a job-skill relationship
    public JobSkill addJobSkill(JobSkill jobSkill) {
        return jobSkillRepository.save(jobSkill);
    }
    public List<JobSkill> getSkillsByJob(Integer jobId) {
        return jobSkillRepository.findByJobId(jobId);
    }
}
