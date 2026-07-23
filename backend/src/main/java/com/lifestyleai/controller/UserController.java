package com.lifestyleai.controller;

import com.lifestyleai.dto.ApiResponse;
import com.lifestyleai.dto.UpdatePasswordRequest;
import com.lifestyleai.dto.UpdateProfileRequest;
import com.lifestyleai.dto.UserResponse;
import com.lifestyleai.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id) {

        UserResponse response = userService.getUserById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User fetched successfully.",
                        response
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        List<UserResponse> response = userService.getAllUsers();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Users fetched successfully.",
                        response
                )
        );
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProfileRequest request) {

        UserResponse response = userService.updateProfile(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Profile updated successfully.",
                        response
                )
        );
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<ApiResponse<String>> updatePassword(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePasswordRequest request) {

        userService.updatePassword(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Password updated successfully.",
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User deleted successfully.",
                        null
                )
        );
    }

}