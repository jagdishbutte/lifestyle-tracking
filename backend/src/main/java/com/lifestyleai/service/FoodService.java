package com.lifestyleai.service;

import java.util.List;

import com.lifestyleai.dto.food.FoodRequest;
import com.lifestyleai.dto.food.FoodResponse;

public interface FoodService {

    FoodResponse addFood(FoodRequest request);

    FoodResponse getFoodById(Long foodId);

    List<FoodResponse> getAllFoods();

    List<FoodResponse> searchFoods(String keyword);

    FoodResponse updateFood(Long foodId, FoodRequest request);

    void deleteFood(Long foodId);

}