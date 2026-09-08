package com.resume_screening.repository;

import com.resume_screening.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

    Optional<Skill> findBySkillNameIgnoreCase(String skillName);

}
