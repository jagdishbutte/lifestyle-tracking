package com.lifestyleai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.food.FoodRequest;
import com.lifestyleai.dto.food.FoodResponse;
import com.lifestyleai.service.FoodService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    private final FoodService foodService;

    /**
     * Method   : POST
     * API      : /api/foods
     * Function : Adds a new food item.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<FoodResponse>> addFood(
            @Valid @RequestBody FoodRequest request) {

        FoodResponse response = foodService.addFood(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Food added successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/foods/{id}
     * Function : Returns food details by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodResponse>> getFoodById(
            @PathVariable Long id) {

        FoodResponse response = foodService.getFoodById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Food retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/foods
     * Function : Returns all active food items.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<FoodResponse>>> getAllFoods() {

        List<FoodResponse> response = foodService.getAllFoods();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Foods retrieved successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/foods/search
     * Function : Searches food items by keyword.
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<FoodResponse>>> searchFoods(
            @RequestParam(defaultValue = "") String keyword) {

        List<FoodResponse> response = foodService.searchFoods(keyword);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Search completed successfully.",
                        response));
    }

    /**
     * Method   : PUT
     * API      : /api/foods/{id}
     * Function : Updates an existing food item.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodResponse>> updateFood(
            @PathVariable Long id,
            @Valid @RequestBody FoodRequest request) {

        FoodResponse response = foodService.updateFood(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Food updated successfully.",
                        response));
    }

    /**
     * Method   : DELETE
     * API      : /api/foods/{id}
     * Function : Soft deletes a food item.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFood(
            @PathVariable Long id) {

        foodService.deleteFood(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Food deleted successfully.",
                        null));
    }

}