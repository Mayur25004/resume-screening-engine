package com.resume_screening.controller;

import com.resume_screening.entity.User;
import com.resume_screening.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
//@RestController => This class contains REST API endpoints.
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //@GetMapping=> When someone sends a GET request to /users, execute the method below it
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    //@PostMapping => When someone sends a POST request to /users, execute the method below it
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Integer id)
    {
        return userService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Integer id,
                           @RequestBody User user){
        return userService.updateUser(id,user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Integer id){
        return userService.deleteUser(id);
    }
}
