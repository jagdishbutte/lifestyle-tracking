package com.lifestyleai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.checkin.DailyCheckInRequest;
import com.lifestyleai.dto.checkin.DailyCheckInResponse;
import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.service.DailyCheckInService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/checkin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DailyCheckInController {

    private final DailyCheckInService dailyCheckInService;

    /**
     * Method   : POST
     * API      : /api/checkin
     * Function : Creates or updates today's check-in.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<DailyCheckInResponse>> saveTodayCheckIn(
            @Valid @RequestBody DailyCheckInRequest request) {

        DailyCheckInResponse response =
                dailyCheckInService.saveTodayCheckIn(request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>(
                        true,
                        "Daily check-in saved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/checkin/user
     * Function : Returns today's check-in.
     */
    @GetMapping("/user")
    public ResponseEntity<ApiResponse<DailyCheckInResponse>> getTodayCheckIn() {

        DailyCheckInResponse response =
                dailyCheckInService.getTodayCheckIn();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Daily check-in fetched successfully.",
                        response));
    }

}