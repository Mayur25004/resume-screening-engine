package com.resume_screening.service;

import com.resume_screening.entity.Skill;
import com.resume_screening.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillExtractionService {

    private final SkillRepository skillRepository;

    public SkillExtractionService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    private boolean containsSkill(String text, String skillName) {

        String pattern = "\\b" +
                java.util.regex.Pattern.quote(skillName) +
                "\\b";

        return java.util.regex.Pattern
                .compile(pattern, java.util.regex.Pattern.CASE_INSENSITIVE)
                .matcher(text)
                .find();
    }

    public List<Skill> extractSkills(String resumeText) {

        List<Skill> allSkills = skillRepository.findAll();
        List<Skill> detectedSkills = new ArrayList<>();

        String text = normalize(resumeText);

        for (Skill skill : allSkills) {

            String skillName = normalize(skill.getSkillName());

            if (containsSkill(text, skillName)) {
                detectedSkills.add(skill);
            }
        }

        return detectedSkills;
    }

    private String normalize(String text) {

        return text
                .toLowerCase()
                .replace(".", "")
                .replace("-", "")
                .replace("_", "")
                .replaceAll("\\s+", " ")
                .trim();
    }
}