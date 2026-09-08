package com.resume_screening.repository;

import com.resume_screening.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository
        extends JpaRepository<Application, Integer> {

    List<Application> findByCandidateId(Integer candidateId);

    List<Application> findByJobId(Integer jobId);

    Optional<Application> findByCandidateIdAndJobId(
            Integer candidateId,
            Integer jobId
    );
}