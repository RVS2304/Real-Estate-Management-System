package com.example.rms.service.impl;

import com.example.rms.dto.LoginDto;
import com.example.rms.dto.UserDto;
import com.example.rms.entity.User;
import com.example.rms.mapper.UserMapper;
import com.example.rms.repository.UserRepository;
import com.example.rms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDto addUser(UserDto userDto) {

        User user = UserMapper.maptoUser(userDto);
        User savedUser = userRepository.save(user);

        return UserMapper.maptoUserDto(savedUser);
    }

    public boolean validateUser(LoginDto loginDto) {
        Optional<User> userOptional = userRepository.findByUsernameAndPasswordAndRole(loginDto.getUsername(), loginDto.getPassword(), loginDto.getRole());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            return user.getPassword().equals(loginDto.getPassword());
        }

        return false;
    }
}
