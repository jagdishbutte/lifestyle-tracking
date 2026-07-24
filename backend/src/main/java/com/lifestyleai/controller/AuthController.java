package com.lifestyleai.controller;

import com.lifestyleai.dto.auth.LoginRequest;
import com.lifestyleai.dto.auth.LoginResponse;
import com.lifestyleai.dto.auth.RegisterRequest;
import com.lifestyleai.dto.user.UserResponse;
import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        UserResponse response = userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User registered successfully.", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = userService.login(request);

        return ResponseEntity.ok( new ApiResponse<>(true, "Login successful.", response)
        );
    }

}