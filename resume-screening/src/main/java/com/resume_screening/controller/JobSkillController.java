package com.resume_screening.controller;

import com.resume_screening.entity.JobSkill;
import com.resume_screening.service.JobSkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobSkillController {

    private final JobSkillService jobSkillService;

    public JobSkillController(JobSkillService jobSkillService) {
        this.jobSkillService = jobSkillService;
    }

    @GetMapping("/job-skills")
    public List<JobSkill> getAllJobSkills() {
        return jobSkillService.getAllJobSkills();
    }

    @PostMapping("/job-skills")
    public JobSkill addJobSkill(@RequestBody JobSkill jobSkill) {
        return jobSkillService.addJobSkill(jobSkill);
    }

    @GetMapping("/jobs/{jobId}/skills")
    public List<JobSkill> getSkillsByJob(@PathVariable Integer jobId) {
        return jobSkillService.getSkillsByJob(jobId);
    }
}