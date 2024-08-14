package com.example.rms.controller;

import com.example.rms.dto.UserDto;
import com.example.rms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
public class UserController {

    private final UserService userService;

    // Constructor Injection
    public UserController(UserService userService) {
        this.userService = userService;
    }


//    Add User REST API
    @PostMapping("/signup")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.addUser(userDto);
        return ResponseEntity.ok(savedUser);
    }
}
