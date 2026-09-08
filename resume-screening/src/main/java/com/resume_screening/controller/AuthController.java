package com.resume_screening.controller;

import com.resume_screening.entity.User;
import com.resume_screening.entity.Candidate;
import com.resume_screening.repository.CandidateRepository;
import com.resume_screening.repository.UserRepository;
import com.resume_screening.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public AuthController(
            UserRepository userRepository,
            CandidateRepository candidateRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "error",
                            "Email already registered"
                    ));
        }

        // Public sign-up always creates a candidate. Admin users must be
        // provisioned by an existing administrator or directly in the DB.
        user.setRole("CANDIDATE");

        user.setPassword(
                encoder.encode(user.getPassword())
        );

        User saved = userRepository.save(user);

        Candidate candidate = new Candidate();
        candidate.setName(saved.getName());
        candidate.setEmail(saved.getEmail());
        candidateRepository.save(candidate);

        saved.setPassword(null);

        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody Map<String, String> request) {

        User user = userRepository.findByEmail(request.get("email"))
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!encoder.matches(
                request.get("password"),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getUserid(),
                user.getEmail(),
                user.getRole()
        );

        return Map.of(
                "userId", user.getUserid(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "token", token
        );


    }

}
