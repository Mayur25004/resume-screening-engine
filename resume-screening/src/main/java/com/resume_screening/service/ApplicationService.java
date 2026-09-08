package com.resume_screening.service;

import com.resume_screening.entity.Application;
import com.resume_screening.entity.Candidate;
import com.resume_screening.repository.ApplicationRepository;
import com.resume_screening.repository.CandidateRepository;
import com.resume_screening.repository.JobRepository;
import com.resume_screening.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.resume_screening.entity.Job;
import java.time.LocalDate;

import java.util.List;
import java.util.Set;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ScreeningResultService screeningResultService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            ScreeningResultService screeningResultService) {

        this.applicationRepository = applicationRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.screeningResultService = screeningResultService;
    }

    public Application apply(
            String email,
            Integer jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Job not found"));

        if ("EXPIRED".equalsIgnoreCase(job.getStatus())) {
            throw new RuntimeException("This job application has expired.");
        }

        if (job.getApplicationDeadline() != null
                && job.getApplicationDeadline().isBefore(LocalDate.now())) {

            job.setStatus("EXPIRED");
            jobRepository.save(job);

            throw new RuntimeException("This job application has expired.");
        }

        Candidate candidate = candidateRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"
                        ));

        // Prevent duplicate application
        if (applicationRepository
                .findByCandidateIdAndJobId(
                        candidate.getCandidateId(),
                        jobId
                )
                .isPresent()) {

            throw new RuntimeException(
                    "You have already applied for this job"
            );
        }

        Application application = new Application();

        application.setCandidateId(
                candidate.getCandidateId()
        );

        application.setJobId(jobId);

        application.setStatus("APPLIED");

        Application savedApplication = applicationRepository.save(application);

        screeningResultService.screenCandidate(
                candidate.getCandidateId(),
                jobId
        );

        return savedApplication;
    }

    public List<Application> getMyApplications(
            String email) {

        Candidate candidate = candidateRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"
                        ));

        return applicationRepository
                .findByCandidateId(
                        candidate.getCandidateId()
                );
    }

    public List<Application> getApplicationsForJob(
            Integer jobId) {

        return applicationRepository.findByJobId(jobId);
    }
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    public Application updateStatus(
            Integer applicationId,
            String status,
            Authentication authentication) {

        boolean isAdmin = userRepository.findByEmail(authentication.getName())
                .map(user -> "ADMIN".equalsIgnoreCase(user.getRole()))
                .orElse(false);
        if (!isAdmin) {
            throw new AccessDeniedException("Only admins can update application status");
        }

        String normalizedStatus = status == null ? "" : status.trim().toUpperCase();
        if (!Set.of("INTERVIEW", "SELECTED", "REJECTED").contains(normalizedStatus)) {
            throw new IllegalArgumentException("Status must be INTERVIEW, SELECTED, or REJECTED");
        }

        Application application = applicationRepository
                .findById(applicationId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"
                        ));

        application.setStatus(normalizedStatus);

        return applicationRepository.save(application);
    }
}
