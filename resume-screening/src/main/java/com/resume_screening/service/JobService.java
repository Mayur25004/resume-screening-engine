package com.resume_screening.service;

import com.resume_screening.entity.Job;
import com.resume_screening.entity.User;
import com.resume_screening.repository.JobRepository;
import com.resume_screening.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.resume_screening.repository.ApplicationRepository;
import com.resume_screening.repository.JobSkillRepository;
import com.resume_screening.repository.ScreeningResultRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final JobSkillRepository jobSkillRepository;
    private final ScreeningResultRepository screeningResultRepository;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            ApplicationRepository applicationRepository,
            JobSkillRepository jobSkillRepository,
            ScreeningResultRepository screeningResultRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.jobSkillRepository = jobSkillRepository;
        this.screeningResultRepository = screeningResultRepository;
    }

    public List<Job> getAllJobs() {
        updateExpiredJobs();
        return jobRepository.findAll();
    }

    public Job createJob(Job job) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found"
                        ));

        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {

            throw new RuntimeException(
                    "Only ADMIN can create jobs"
            );
        }

        job.setCreatedBy(user);

        return jobRepository.save(job);
    }

    public Job updateJob(Integer jobId, Job updatedJob) {

        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setDepartment(updatedJob.getDepartment());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setWorkMode(updatedJob.getWorkMode());
        existingJob.setNumberOfOpenings(updatedJob.getNumberOfOpenings());
        existingJob.setSalaryRange(updatedJob.getSalaryRange());
        existingJob.setBonusIncentives(updatedJob.getBonusIncentives());
        existingJob.setBenefits(updatedJob.getBenefits());
        existingJob.setMinExperience(updatedJob.getMinExperience());
        existingJob.setMaxExperience(updatedJob.getMaxExperience());
        existingJob.setEducationQualification(updatedJob.getEducationQualification());
        existingJob.setPreferredDegree(updatedJob.getPreferredDegree());
        existingJob.setCertifications(updatedJob.getCertifications());
        existingJob.setApplicationDeadline(updatedJob.getApplicationDeadline());
        existingJob.setExpectedJoiningDate(updatedJob.getExpectedJoiningDate());
        existingJob.setInterviewProcess(updatedJob.getInterviewProcess());
        existingJob.setInterviewRounds(updatedJob.getInterviewRounds());
        existingJob.setRecruiterContact(updatedJob.getRecruiterContact());

        return jobRepository.save(existingJob);
    }
    public void deleteJob(Integer jobId) {

        if (!jobRepository.existsById(jobId)) {
            throw new RuntimeException("Job not found");
        }

        applicationRepository.deleteAll(
                applicationRepository.findByJobId(jobId)
        );

        screeningResultRepository.deleteAll(
                screeningResultRepository.findByJobId(jobId)
        );

        jobSkillRepository.deleteAll(
                jobSkillRepository.findByJobId(jobId)
        );

        jobRepository.deleteById(jobId);
    }

    public void updateExpiredJobs() {
        List<Job> jobs = jobRepository.findAll();

        LocalDate today = LocalDate.now();

        for (Job job : jobs) {
            if (job.getApplicationDeadline() != null
                    && job.getApplicationDeadline().isBefore(today)
                    && !"EXPIRED".equalsIgnoreCase(job.getStatus())) {

                job.setStatus("EXPIRED");
            }
        }

        jobRepository.saveAll(jobs);
    }
}