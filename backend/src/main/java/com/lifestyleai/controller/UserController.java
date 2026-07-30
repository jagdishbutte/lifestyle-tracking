package com.lifestyleai.controller;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.user.UpdatePasswordRequest;
import com.lifestyleai.dto.user.UpdateProfileRequest;
import com.lifestyleai.dto.user.UserResponse;
import com.lifestyleai.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    /**
     * Method   : GET
     * API      : /api/users/
     * Function : Returns a user's profile by ID.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<UserResponse>> getUserById() {

        com.lifestyleai.dto.user.UserResponse response = userService.getUserById();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User fetched successfully.",
                        response
                )
        );
    }

    /**
     * Method   : GET
     * API      : /api/users/all
     * Function : Returns all registered users.
     * Note     : Intended for Admin Dashboard.
     */
    @GetMapping("/all")
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

    /**
     * Method   : PUT
     * API      : /api/users/profile
     * Function : Updates a user's profile information.
     */
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request) {

        UserResponse response = userService.updateProfile(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Profile updated successfully.",
                        response
                )
        );
    }

    /**
     * Method   : PUT
     * API      : /api/users/password
     * Function : Updates a user's account password.
     */
    @PutMapping("/password")
    public ResponseEntity<ApiResponse<String>> updatePassword(
            @Valid @RequestBody UpdatePasswordRequest request) {

        userService.updatePassword(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Password updated successfully.",
                        null
                )
        );
    }

    /**
     * Method   : DELETE
     * API      : /api/users
     * Function : Deletes a user account.
     * Note     : Intended for Admin Dashboard.
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse<String>> deleteUser() {

        userService.deleteUser();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User deleted successfully.",
                        null
                )
        );
    }

}