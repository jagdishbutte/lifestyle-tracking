package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.food.AddMealRequest;
import com.lifestyleai.dto.food.DailyDietResponse;
import com.lifestyleai.dto.food.DietEntryResponse;
import com.lifestyleai.dto.food.UpdateDietEntryRequest;
import com.lifestyleai.service.DietService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class DietController {

    private final DietService dietService;

    /**
     * Method   : POST
     * API      : /api/diet
     * Function : Adds multiple food items for a meal.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<DailyDietResponse>> addMeal(
            @Valid @RequestBody AddMealRequest request) {

        DailyDietResponse response = dietService.addMeal(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Meal added successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/diet/user/{userId}/date/{date}
     * Function : Returns complete diet summary for a specific date.
     */
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<ApiResponse<DailyDietResponse>> getDietByDate(
            @PathVariable Long userId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        DailyDietResponse response = dietService.getDietByDate(userId, date);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Diet fetched successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/diet/user/{userId}/today
     * Function : Returns today's diet summary.
     */
    @GetMapping("/user/{userId}/today")
    public ResponseEntity<ApiResponse<DailyDietResponse>> getTodayDiet(
            @PathVariable Long userId) {

        DailyDietResponse response = dietService.getTodayDiet(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Today's diet fetched successfully.",
                        response));
    }

    /**
     * Method   : PUT
     * API      : /api/diet/entry/{dietEntryId}
     * Function : Updates a single diet entry.
     */
    @PutMapping("/entry/{dietEntryId}")
    public ResponseEntity<ApiResponse<DietEntryResponse>> updateDietEntry(
            @PathVariable Long dietEntryId,
            @Valid @RequestBody UpdateDietEntryRequest request) {

        DietEntryResponse response =
                dietService.updateDietEntry(dietEntryId, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Diet entry updated successfully.",
                        response));
    }

    /**
     * Method   : DELETE
     * API      : /api/diet/entry/{dietEntryId}
     * Function : Deletes a single diet entry.
     */
    @DeleteMapping("/entry/{dietEntryId}")
    public ResponseEntity<ApiResponse<Void>> deleteDietEntry(
            @PathVariable Long dietEntryId) {

        dietService.deleteDietEntry(dietEntryId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Diet entry deleted successfully.",
                        null));
    }
    
    /**
     * Method   : GET
     * API      : /api/diet/user/{userId}/history?days=7
     * Function : Returns diet history for the last N days.
     */
    @GetMapping("/user/{userId}/history")
    public ResponseEntity<ApiResponse<List<DailyDietResponse>>> getDietHistory(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "7") Integer days) {

        List<DailyDietResponse> response =
                dietService.getDietHistory(userId, days);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Diet history retrieved successfully.",
                        response));
    }

}