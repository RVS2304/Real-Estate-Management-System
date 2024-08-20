package com.example.rms.controller;

import com.example.rms.dto.UserDto;
import com.example.rms.entity.ROLE;
import com.example.rms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins ="http://localhost:5173") // Allow requests from this origin
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

//    get users by role
    @GetMapping("/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable("role")ROLE role) {
        List<UserDto> users = userService.getUserByRole(role);
        return ResponseEntity.ok(users);
    }

//    get users by name
    @GetMapping("/name/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable("username")String username) {
        UserDto user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

//    get users by id
    @GetMapping("/id/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId")Long userId) {
        UserDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
