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
     * API      : /api/users/{id}
     * Function : Returns a user's profile by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id) {

        com.lifestyleai.dto.user.UserResponse response = userService.getUserById(id);

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
     * API      : /api/users
     * Function : Returns all registered users.
     * Note     : Intended for Admin Dashboard.
     */
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

    /**
     * Method   : PUT
     * API      : /api/users/{id}/profile
     * Function : Updates a user's profile information.
     */
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

    /**
     * Method   : PUT
     * API      : /api/users/{id}/password
     * Function : Updates a user's account password.
     */
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

    /**
     * Method   : DELETE
     * API      : /api/users/{id}
     * Function : Deletes a user account.
     * Note     : Intended for Admin Dashboard.
     */
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