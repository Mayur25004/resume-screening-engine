package com.resume_screening.repository;

import com.resume_screening.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {

Optional<User> findByEmail(String email);
}
