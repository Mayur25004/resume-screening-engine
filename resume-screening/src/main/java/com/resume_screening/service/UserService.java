package com.resume_screening.service;

import com.resume_screening.entity.User;
import com.resume_screening.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service => This class contains application/business logic. Manage an object of this class
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user){
        return userRepository.save(user);
    }
    public User getUserById(Integer id){
        return userRepository.findById(id).orElse(null);
    }
    public User updateUser(Integer id,User updatedUser){
        User existingUser = userRepository.findById(id).orElse(null);
        if(existingUser != null){
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        }
        return null;
    }

    public String deleteUser(Integer id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return "User deleted successfully";
        }

        return "User not found";
    }



}
