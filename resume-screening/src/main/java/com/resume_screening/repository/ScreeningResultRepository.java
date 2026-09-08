package com.resume_screening.repository;

import com.resume_screening.entity.ScreeningResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScreeningResultRepository
        extends JpaRepository<ScreeningResult, Integer> {

    List<ScreeningResult> findByCandidateId(Integer candidateId);

    List<ScreeningResult> findByJobId(Integer jobId);

    Optional<ScreeningResult> findTopByCandidateIdAndJobIdOrderByResultIdDesc(
            Integer candidateId,
            Integer jobId
    );
}