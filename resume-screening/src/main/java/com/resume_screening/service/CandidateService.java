package com.resume_screening.service;

import com.resume_screening.entity.Candidate;
import com.resume_screening.entity.Skill;
import com.resume_screening.repository.CandidateRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final ResumeParserService resumeParserService;
    private final SkillExtractionService skillExtractionService;
    private final CandidateSkillService candidateSkillService;

    public CandidateService(
            CandidateRepository candidateRepository,
            ResumeParserService resumeParserService,
            SkillExtractionService skillExtractionService,
            CandidateSkillService candidateSkillService) {

        this.candidateRepository = candidateRepository;
        this.resumeParserService = resumeParserService;
        this.skillExtractionService = skillExtractionService;
        this.candidateSkillService = candidateSkillService;
    }

    // Get all candidates
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }
    public Candidate getCandidateByEmail(String email) {

        return candidateRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));
    }
    // Create a candidate
    public Candidate createCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    // Upload and process resume
    @Transactional
    public Candidate uploadResume(
            Integer candidateId,
            MultipartFile file,
            Authentication authentication) throws IOException {

        Candidate candidate = getCandidateForUser(candidateId, authentication);

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("A PDF resume is required");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null
                || !originalFilename.toLowerCase().endsWith(".pdf")
                || (file.getContentType() != null
                && !"application/pdf".equalsIgnoreCase(file.getContentType()))) {
            throw new IllegalArgumentException("Only PDF resumes are allowed");
        }

        Path uploadDirectory = Paths.get("uploads", "resumes")
                .toAbsolutePath().normalize();

        Files.createDirectories(uploadDirectory);

        Path filePath = uploadDirectory.resolve(UUID.randomUUID() + ".pdf");

        Files.write(filePath, file.getBytes());

        // Extract text from PDF
        String resumeText =
                resumeParserService.extractText(
                        filePath.toString()
                );

        // Extract skills from resume text
        List<Skill> detectedSkills =
                skillExtractionService.extractSkills(resumeText);

        candidateSkillService.replaceDetectedSkills(
                candidateId,
                detectedSkills
        );

        String previousResumePath = candidate.getResumePath();
        candidate.setResumePath(filePath.toString());

        if (previousResumePath != null) {
            Path previousFile = Paths.get(previousResumePath)
                    .toAbsolutePath().normalize();
            if (previousFile.startsWith(uploadDirectory)) {
                Files.deleteIfExists(previousFile);
            }
        }

        return candidateRepository.save(candidate);
    }
    // Update candidate profile
    public Candidate updateCandidate(
            Integer candidateId,
            Candidate updatedCandidate,
            Authentication authentication) {

        Candidate candidate = getCandidateForUser(candidateId, authentication);

        candidate.setName(updatedCandidate.getName());
        candidate.setEmail(updatedCandidate.getEmail());
        candidate.setPhone(updatedCandidate.getPhone());
        candidate.setCurrentTitle(updatedCandidate.getCurrentTitle());
        candidate.setExperienceYears(updatedCandidate.getExperienceYears());

        return candidateRepository.save(candidate);
    }
    public Candidate getCandidateById(Integer candidateId) {
        return candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public Candidate getCandidateForUser(
            Integer candidateId,
            Authentication authentication) {
        Candidate candidate = getCandidateById(candidateId);

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !candidate.getEmail().equalsIgnoreCase(authentication.getName())) {
            throw new AccessDeniedException("You cannot access another candidate's profile");
        }

        return candidate;
    }
}
