package com.lifestyleai.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.checkin.DailyCheckInRequest;
import com.lifestyleai.dto.checkin.DailyCheckInResponse;
import com.lifestyleai.service.DailyCheckInService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/checkin")
@RequiredArgsConstructor
public class DailyCheckInController {

    private final DailyCheckInService dailyCheckInService;

    /**
     * Method   : POST
     * API      : /api/checkin
     * Function : Creates or updates today's check-in.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public DailyCheckInResponse saveTodayCheckIn(
            @Valid @RequestBody DailyCheckInRequest request) {

        return dailyCheckInService.saveTodayCheckIn(request);
    }

    /**
     * Method   : GET
     * API      : /api/checkin/user/{userId}
     * Function : Returns today's check-in.
     */
    @GetMapping("/user/{userId}")
    public DailyCheckInResponse getTodayCheckIn(
            @PathVariable Long userId) {

        return dailyCheckInService.getTodayCheckIn(userId);
    }

}