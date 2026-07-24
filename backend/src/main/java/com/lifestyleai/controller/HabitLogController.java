package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.format.annotation.DateTimeFormat;
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
//@CrossOrigin(origins = "http://localhost:5173")
public class HabitLogController {

    private final HabitLogService habitLogService;

    /**
     * Method   : POST
     * API      : /api/habit-logs
     * Function : Marks a habit as completed/incomplete for a specific date.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<HabitLogResponse>> markHabit(
            @Valid @RequestBody HabitLogRequest request) {

        HabitLogResponse response = habitLogService.markHabit(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Habit status updated successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/{id}
     * Function : Returns a habit log by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<HabitLogResponse>> getHabitLogById(
            @PathVariable Long id) {

        HabitLogResponse response = habitLogService.getHabitLogById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit log retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/habit/{habitId}
     * Function : Returns all logs of a particular habit.
     */
    @GetMapping("/habit/{habitId}")
    public ResponseEntity<ApiResponse<List<HabitLogResponse>>> getHabitLogsByHabit(
            @PathVariable Long habitId) {

        List<HabitLogResponse> response = habitLogService.getHabitLogsByHabit(habitId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit logs retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/habit-logs/date/{date}
     * Function : Returns all habit logs for a particular date.
     */
    @GetMapping("/date/{date}")
    public ResponseEntity<ApiResponse<List<HabitLogResponse>>> getHabitLogsByDate(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        List<HabitLogResponse> response = habitLogService.getHabitLogsByDate(date);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Habit logs retrieved successfully.",
                        response));
    }

}