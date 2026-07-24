package com.lifestyleai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.food.FoodRequest;
import com.lifestyleai.dto.food.FoodResponse;
import com.lifestyleai.service.FoodService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
@Validated
public class FoodController {

    private final FoodService foodService;

    /**
     * Method   : POST
     * API      : /api/foods
     * Function : Adds a new food item.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FoodResponse addFood(@Valid @RequestBody FoodRequest request) {

        return foodService.addFood(request);
    }

    /**
     * Method   : GET
     * API      : /api/foods/{id}
     * Function : Returns food details by ID.
     */
    @GetMapping("/{id}")
    public FoodResponse getFoodById(@PathVariable Long id) {

        return foodService.getFoodById(id);
    }

    /**
     * Method   : GET
     * API      : /api/foods
     * Function : Returns all active food items.
     */
    @GetMapping
    public List<FoodResponse> getAllFoods() {

        return foodService.getAllFoods();
    }

    /**
     * Method   : GET
     * API      : /api/foods/search
     * Function : Searches food items by keyword.
     */
    @GetMapping("/search")
    public List<FoodResponse> searchFoods(
            @RequestParam(defaultValue = "") String keyword) {

        return foodService.searchFoods(keyword);
    }

    /**
     * Method   : PUT
     * API      : /api/foods/{id}
     * Function : Updates an existing food item.
     */
    @PutMapping("/{id}")
    public FoodResponse updateFood(
            @PathVariable Long id,
            @Valid @RequestBody FoodRequest request) {

        return foodService.updateFood(id, request);
    }

    /**
     * Method   : DELETE
     * API      : /api/foods/{id}
     * Function : Soft deletes a food item.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable Long id) {

        foodService.deleteFood(id);
    }

}