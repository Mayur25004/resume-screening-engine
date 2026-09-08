package com.resume_screening.service;

import com.resume_screening.entity.Skill;
import com.resume_screening.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills(){
        return skillRepository.findAll();
    }

    public Skill createSkill(Skill skill){
        if (skill == null || skill.getSkillName() == null
                || skill.getSkillName().isBlank()) {
            throw new IllegalArgumentException("Skill name is required");
        }

        String skillName = skill.getSkillName().trim();

        // Reuse a skill irrespective of capitalisation, while allowing a
        // distinct, specific name such as "HTML (Frontend)".
        return skillRepository.findBySkillNameIgnoreCase(skillName)
                .orElseGet(() -> {
                    skill.setSkillName(skillName);
                    if (skill.getCategory() != null) {
                        skill.setCategory(skill.getCategory().trim());
                    }
                    return skillRepository.save(skill);
                });
    }
}
