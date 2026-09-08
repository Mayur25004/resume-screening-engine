package com.resume_screening.controller;

import com.resume_screening.entity.Skill;
import com.resume_screening.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService){
        this.skillService = skillService;
    }

    @GetMapping ("/skills")
    public List<Skill> getAllSkills(){
        return skillService.getAllSkills();
    }

    @PostMapping("/skills")
    public Skill createSkill(@RequestBody Skill skill){
        return skillService.createSkill(skill);
    }

}
