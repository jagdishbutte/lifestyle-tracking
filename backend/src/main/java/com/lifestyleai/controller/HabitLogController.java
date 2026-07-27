package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.habit.HabitLogRequest;
import com.lifestyleai.dto.habit.HabitLogResponse;
import com.lifestyleai.service.HabitLogService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/habit-logs")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class HabitLogController {

    private final HabitLogService habitLogService;

    /**
     * Method   : PATCH
     * API      : /api/habit-logs/completion
     * Function : Marks today's habit as completed/incomplete (Upsert).
     */
    @PatchMapping("/completion")
    public ResponseEntity<ApiResponse<HabitLogResponse>> updateHabitCompletion(
            @Valid @RequestBody HabitLogRequest request) {

        HabitLogResponse response =
                habitLogService.updateHabitCompletion(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit status updated successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/user/{userId}/today
     * Function : Returns today's habit logs of a user.
     */
    @GetMapping("/user/{userId}/today")
    public ResponseEntity<ApiResponse<List<HabitLogResponse>>> getTodayHabitLogs(
            @PathVariable Long userId) {

        List<HabitLogResponse> response =
                habitLogService.getTodayHabitLogs(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Today's habit logs retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/habit/{habitId}
     * Function : Returns complete history of a habit.
     */
    @GetMapping("/habit/{habitId}")
    public ResponseEntity<ApiResponse<List<HabitLogResponse>>> getHabitLogsByHabit(
            @RequestParam Long userId,
            @PathVariable Long habitId) {

        List<HabitLogResponse> response =
                habitLogService.getHabitLogsByHabit(userId, habitId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit history retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/user/{userId}
     * Function : Returns habit logs within a date range.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<HabitLogResponse>>> getHabitLogsBetweenDates(
            @PathVariable Long userId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate start,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate end) {

        List<HabitLogResponse> response =
                habitLogService.getHabitLogsBetweenDates(userId, start, end);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit logs retrieved successfully.",
                        response));
    }

}