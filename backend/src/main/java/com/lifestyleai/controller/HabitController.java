package com.lifestyleai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.habit.HabitRequest;
import com.lifestyleai.dto.habit.HabitResponse;
import com.lifestyleai.service.HabitService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HabitController {

    private final HabitService habitService;

    /**
     * Method   : POST
     * API      : /api/habits
     * Function : Creates a new habit for a user.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<HabitResponse>> addHabit(
            @Valid @RequestBody HabitRequest request) {

        HabitResponse response = habitService.addHabit(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Habit created successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habits/{id}
     * Function : Returns a habit by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<HabitResponse>> getHabitById(
            @PathVariable Long id) {

        HabitResponse response = habitService.getHabitById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habits
     * Function : Returns all habits.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<HabitResponse>>> getAllHabits() {

        List<HabitResponse> response = habitService.getAllHabits();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habits retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habits/user/{userId}
     * Function : Returns all active habits of a user.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<HabitResponse>>> getHabitsByUser(
            @PathVariable Long userId) {

        List<HabitResponse> response = habitService.getHabitsByUser(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User habits retrieved successfully.",
                        response));
    }

    /**
     * Method   : PUT
     * API      : /api/habits/{id}
     * Function : Updates an existing habit.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<HabitResponse>> updateHabit(
            @PathVariable Long id,
            @Valid @RequestBody HabitRequest request) {

        HabitResponse response = habitService.updateHabit(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit updated successfully.",
                        response));
    }

    /**
     * Method   : DELETE
     * API      : /api/habits/{id}
     * Function : Soft deletes a habit by marking it inactive.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHabit(
            @PathVariable Long id) {

        habitService.deleteHabit(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit deleted successfully.",
                        null));
    }

}