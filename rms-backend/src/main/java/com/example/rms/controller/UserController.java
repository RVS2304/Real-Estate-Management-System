package com.example.rms.controller;

import com.example.rms.dto.UserDto;
import com.example.rms.entity.ROLE;
import com.example.rms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins ="*") // Allow requests from this origin
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
}
