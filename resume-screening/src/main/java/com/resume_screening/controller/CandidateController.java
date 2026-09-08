package com.resume_screening.controller;

import com.resume_screening.entity.Candidate;
import com.resume_screening.service.CandidateService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @PostMapping("/candidates")
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return candidateService.createCandidate(candidate);
    }
    @PostMapping("/candidates/{candidateId}/resume")
    public Candidate uploadResume(
            @PathVariable Integer candidateId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        return candidateService.uploadResume(candidateId, file, authentication);
    }
    @GetMapping("/candidates/me")
    public Candidate getMyProfile(
            org.springframework.security.core.Authentication authentication) {

        String email = authentication.getName();

        return candidateService.getCandidateByEmail(email);
    }
    @PutMapping("/candidates/{candidateId}")
    public Candidate updateCandidate(
            @PathVariable Integer candidateId,
            @RequestBody Candidate candidate,
            Authentication authentication) {

        return candidateService.updateCandidate(candidateId, candidate, authentication);
    }
    @GetMapping("/candidates/{candidateId}/resume")
    public ResponseEntity<Resource> viewResume(
            @PathVariable Integer candidateId,
            Authentication authentication) throws Exception {

        Candidate candidate = candidateService.getCandidateForUser(candidateId, authentication);

        if (candidate.getResumePath() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get(candidate.getResumePath());

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + filePath.getFileName() + "\""
                )
                .body(resource);
    }
}
