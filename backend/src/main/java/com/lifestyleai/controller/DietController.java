package com.lifestyleai.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.food.AddMealRequest;
import com.lifestyleai.dto.food.DailyDietResponse;
import com.lifestyleai.service.DietService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/diet")
@RequiredArgsConstructor
@Validated
public class DietController {

    private final DietService dietService;

    /**
     * Method   : POST
     * API      : /api/diet
     * Function : Adds multiple food items for a meal.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DailyDietResponse addMeal(
            @Valid @RequestBody AddMealRequest request) {

        return dietService.addMeal(request);
    }

    /**
     * Method   : GET
     * API      : /api/diet/user/{userId}/date/{date}
     * Function : Returns complete diet summary for a specific date.
     */
    @GetMapping("/user/{userId}/date/{date}")
    public DailyDietResponse getDietByDate(
            @PathVariable Long userId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return dietService.getDietByDate(userId, date);
    }

    /**
     * Method   : GET
     * API      : /api/diet/user/{userId}/today
     * Function : Returns today's diet summary.
     */
    @GetMapping("/user/{userId}/today")
    public com.lifestyleai.dto.food.DailyDietResponse getTodayDiet(
            @PathVariable Long userId) {

        return dietService.getTodayDiet(userId);
    }

    /**
     * Method   : PUT
     * API      : /api/diet/entry/{dietEntryId}
     * Function : Updates a single diet entry.
     */
    @PutMapping("/entry/{dietEntryId}")
    public com.lifestyleai.dto.food.DietEntryResponse updateDietEntry(
            @PathVariable Long dietEntryId,
            @Valid @RequestBody com.lifestyleai.dto.food.UpdateDietEntryRequest request) {

        return dietService.updateDietEntry(dietEntryId, request);
    }

    /**
     * Method   : DELETE
     * API      : /api/diet/entry/{dietEntryId}
     * Function : Deletes a single diet entry.
     */
    @DeleteMapping("/entry/{dietEntryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDietEntry(
            @PathVariable Long dietEntryId) {

        dietService.deleteDietEntry(dietEntryId);
    }

}