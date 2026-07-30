package com.lifestyleai.service;

import java.util.List;

//import java.util.List;

import com.lifestyleai.dto.auth.LoginRequest;
import com.lifestyleai.dto.auth.LoginResponse;
import com.lifestyleai.dto.auth.RegisterRequest;
import com.lifestyleai.dto.user.UpdatePasswordRequest;
import com.lifestyleai.dto.user.UpdateProfileRequest;
import com.lifestyleai.dto.user.UserResponse;

public interface UserService {

    // Authentication
    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    // User Management
    UserResponse getUserById();

    List<UserResponse> getAllUsers();

    UserResponse updateProfile(UpdateProfileRequest request);

    void updatePassword(UpdatePasswordRequest request);

    void deleteUser();
}