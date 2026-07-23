package com.lifestyleai.service;

import java.util.List;

//import java.util.List;

import com.lifestyleai.dto.LoginRequest;
import com.lifestyleai.dto.LoginResponse;
import com.lifestyleai.dto.RegisterRequest;
import com.lifestyleai.dto.UpdatePasswordRequest;
import com.lifestyleai.dto.UpdateProfileRequest;
import com.lifestyleai.dto.UserResponse;

public interface UserService {

    // Authentication
    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    // User Management
    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    UserResponse updateProfile(Long id, UpdateProfileRequest request);

    void updatePassword(Long id, UpdatePasswordRequest request);

    void deleteUser(Long id);
}