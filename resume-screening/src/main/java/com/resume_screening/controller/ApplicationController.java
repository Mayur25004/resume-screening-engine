package com.resume_screening.controller;

import com.resume_screening.entity.Application;
import com.resume_screening.service.ApplicationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping
    public Application apply(

            @RequestParam Integer jobId,
            Authentication authentication) {
        System.out.println("🔥 APPLICATION CONTROLLER REACHED");
        String email = authentication.getName();

        return applicationService.apply(
                email,
                jobId
        );
    }

    @GetMapping("/my")
    public List<Application> getMyApplications(
            Authentication authentication) {

        String email = authentication.getName();

        return applicationService
                .getMyApplications(email);
    }

    @GetMapping("/job/{jobId}")
    public List<Application> getApplicationsForJob(
            @PathVariable Integer jobId) {

        return applicationService
                .getApplicationsForJob(jobId);
    }

    @PutMapping("/{applicationId}/status")
    public Application updateStatus(
            @PathVariable Integer applicationId,
            @RequestParam String status,
            Authentication authentication) {

        return applicationService.updateStatus(
                applicationId,
                status,
                authentication
        );
    }
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }
}
