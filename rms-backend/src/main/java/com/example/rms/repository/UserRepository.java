package com.example.rms.repository;

import com.example.rms.entity.ROLE;
import com.example.rms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsernameAndPasswordAndRole(String username, String password, ROLE role);
}
