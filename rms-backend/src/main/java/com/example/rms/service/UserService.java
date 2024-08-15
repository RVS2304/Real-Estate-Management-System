package com.example.rms.service;

import com.example.rms.dto.LoginDto;
import com.example.rms.dto.UserDto;
import com.example.rms.entity.ROLE;

import java.util.List;

//import java.util.List;

public interface UserService {

    UserDto addUser(UserDto userDto);
    boolean validateUser(LoginDto loginDto);
//    UserDto updateUser(UserDto userDto);
//    UserDto getUserById (long id);
//    List<UserDto> getAllUsers();
//    void deleteUser(long id);
//    UserDto getUserByName(String name);
    List<UserDto> getUserByRole(ROLE role);
}
