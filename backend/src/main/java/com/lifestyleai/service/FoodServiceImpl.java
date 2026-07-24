package com.lifestyleai.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.food.FoodRequest;
import com.lifestyleai.dto.food.FoodResponse;
import com.lifestyleai.entity.Food;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.FoodRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;
    private final ModelMapper mapper;

    @Override
    public FoodResponse addFood(FoodRequest request) {

        Food food = mapper.map(request, Food.class);

        food.setIsActive(true);

        return mapper.map(foodRepository.save(food), FoodResponse.class);
    }

    @Override
    @Transactional(readOnly = true)
    public FoodResponse getFoodById(Long foodId) {

        return mapper.map(findFood(foodId), FoodResponse.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodResponse> getAllFoods() {

        return foodRepository.findByIsActiveTrue()
                .stream()
                .map(food -> mapper.map(food, FoodResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FoodResponse> searchFoods(String keyword) {

        return foodRepository
                .findByNameContainingIgnoreCaseAndIsActiveTrueOrderByNameAsc(keyword)
                .stream()
                .map(food -> mapper.map(food, FoodResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse updateFood(Long foodId, FoodRequest request) {

        Food food = findFood(foodId);

        food.setName(request.getName());
        food.setCategory(request.getCategory());
        food.setServingQuantity(request.getServingQuantity());
        food.setServingUnit(request.getServingUnit());

        food.setCaloriesPerServing(request.getCalories());
        food.setProteinPerServing(request.getProtein());
        food.setCarbsPerServing(request.getCarbs());
        food.setFatPerServing(request.getFat());
        food.setFiberPerServing(request.getFiber());

        return mapper.map(foodRepository.save(food), FoodResponse.class);
    }

    @Override
    public void deleteFood(Long foodId) {

        Food food = findFood(foodId);

        food.setIsActive(false);

        foodRepository.save(food);
    }

    /**
     * Finds an active food by its ID.
     *
     * @param foodId Food ID
     * @return Food entity
     */
    private Food findFood(Long foodId) {

        return foodRepository
                .findByIdAndIsActiveTrue(foodId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Food not found with id : " + foodId));
    }

}