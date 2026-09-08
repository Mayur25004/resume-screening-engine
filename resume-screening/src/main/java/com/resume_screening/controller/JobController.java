package com.resume_screening.controller;

import com.resume_screening.entity.Job;
import com.resume_screening.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService){
        this.jobService = jobService;
    }
    @GetMapping("/jobs")
    public List<Job> getAllJobs(){
        return jobService.getAllJobs();
    }

    @PostMapping("/jobs")
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    @PutMapping("/jobs/{jobId}")
    public Job updateJob(
            @PathVariable Integer jobId,
            @RequestBody Job job) {

        return jobService.updateJob(jobId, job);
    }
    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.noContent().build();
    }

}
