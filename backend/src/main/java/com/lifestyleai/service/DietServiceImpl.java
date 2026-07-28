package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.food.AddMealRequest;
import com.lifestyleai.dto.food.DailyDietResponse;
import com.lifestyleai.dto.food.DietEntryResponse;
import com.lifestyleai.dto.food.MealItemRequest;
import com.lifestyleai.dto.food.MealResponse;
import com.lifestyleai.dto.food.UpdateDietEntryRequest;
import com.lifestyleai.entity.DietEntry;
import com.lifestyleai.entity.Food;
import com.lifestyleai.entity.User;
import com.lifestyleai.enums.food.MealType;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.DietEntryRepository;
import com.lifestyleai.repository.FoodRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DietServiceImpl implements DietService {

    private final DietEntryRepository dietEntryRepository;
    private final FoodRepository foodRepository;
    private final UserHelper userHelper;
    private final ModelMapper mapper;

    @Override
    public DailyDietResponse addMeal(AddMealRequest request) {

        User user = userHelper.findActiveUser(request.getUserId());

        List<DietEntry> entries = new ArrayList<>();

        for (MealItemRequest item : request.getItems()) {

            Food food = findFood(item.getFoodId());

            DietEntry entry = new DietEntry();

            entry.setUser(user);
            entry.setFood(food);
            entry.setMealType(request.getMealType());
            entry.setConsumedDate(request.getConsumedDate());

            entry.setQuantityConsumed(item.getQuantity());

            calculateNutrition(entry);

            entries.add(entry);
        }

        dietEntryRepository.saveAll(entries);

        return getDietByDate(request.getUserId(),
                request.getConsumedDate());
    }

    @Override
    @Transactional(readOnly = true)
    public DailyDietResponse getDietByDate(Long userId,
                                           LocalDate date) {

        List<DietEntry> entries =
                dietEntryRepository.findByUserIdAndConsumedDate(userId, date);

        return buildDailyResponse(entries, date);
    }

    @Override
    @Transactional(readOnly = true)
    public DailyDietResponse getTodayDiet(Long userId) {

        return getDietByDate(userId, LocalDate.now());
    }

    @Override
    public DietEntryResponse updateDietEntry(Long dietEntryId,
                                             UpdateDietEntryRequest request) {

        DietEntry entry = findDietEntry(dietEntryId);

        Food food = entry.getFood();

        entry.setFood(food);
        entry.setQuantityConsumed(request.getQuantity());
        calculateNutrition(entry);

        DietEntry updated = dietEntryRepository.save(entry);

        DietEntryResponse response =
                mapper.map(updated, DietEntryResponse.class);

        response.setFoodName(updated.getFood().getName());

        return response;
    }

    @Override
    public void deleteDietEntry(Long dietEntryId) {

        dietEntryRepository.delete(findDietEntry(dietEntryId));
    }

    /* ==========================================================
                        Helper Methods
       ========================================================== */

    private Food findFood(Long foodId) {

        return foodRepository.findByIdAndIsActiveTrue(foodId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food not found with id : " + foodId));
    }

    private DietEntry findDietEntry(Long id) {

        return dietEntryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Diet entry not found with id : " + id));
    }

    /**
     * Builds complete daily summary grouped by meal.
     */
    private DailyDietResponse buildDailyResponse(
            List<DietEntry> entries,
            LocalDate date) {

        DailyDietResponse response = new DailyDietResponse();
        response.setDate(date);

        Map<MealType, List<DietEntry>> grouped =
                entries.stream()
                        .collect(Collectors.groupingBy(DietEntry::getMealType));

        List<MealResponse> mealResponses = new ArrayList<>();

        double totalCalories = 0;
        double totalProtein = 0;
        double totalCarbs = 0;
        double totalFat = 0;
        double totalFiber = 0;

        for (MealType mealType : MealType.values()) {

            List<DietEntry> mealEntries =
                    grouped.getOrDefault(mealType, Collections.emptyList());

            if (mealEntries.isEmpty())
                continue;

            MealResponse meal = new MealResponse();

            meal.setMealType(mealType);

            List<DietEntryResponse> dtoList = new ArrayList<>();

            double mealCalories = 0;
            double mealProtein = 0;
            double mealCarbs = 0;
            double mealFat = 0;
            double mealFiber = 0;

            for (DietEntry entry : mealEntries) {

                DietEntryResponse dto =
                        mapper.map(entry, DietEntryResponse.class);

                dto.setFoodName(entry.getFood().getName());

                dtoList.add(dto);

                mealCalories += entry.getConsumedCalories();
                mealProtein += entry.getConsumedProtein();
                mealCarbs += entry.getConsumedCarbs();
                mealFat += entry.getConsumedFat();
                mealFiber += entry.getConsumedFiber();
            }

            meal.setEntries(dtoList);

            meal.setTotalCalories(mealCalories);
            meal.setTotalProtein(mealProtein);
            meal.setTotalCarbs(mealCarbs);
            meal.setTotalFat(mealFat);
            meal.setTotalFiber(mealFiber);
            meal.setItemCount(dtoList.size());

            mealResponses.add(meal);

            totalCalories += mealCalories;
            totalProtein += mealProtein;
            totalCarbs += mealCarbs;
            totalFat += mealFat;
            totalFiber += mealFiber;
        }

        response.setMealSummaries(mealResponses);

        response.setTotalCalories(totalCalories);
        response.setTotalProtein(totalProtein);
        response.setTotalCarbs(totalCarbs);
        response.setTotalFat(totalFat);
        response.setTotalFiber(totalFiber);

        return response;
    }
    
    private void calculateNutrition(DietEntry entry) {

        Food food = entry.getFood();
        double quantity = entry.getQuantityConsumed();

        entry.setConsumedCalories(food.getCaloriesPerServing() * quantity);
        entry.setConsumedProtein(food.getProteinPerServing() * quantity);
        entry.setConsumedCarbs(food.getCarbsPerServing() * quantity);
        entry.setConsumedFat(food.getFatPerServing() * quantity);
        entry.setConsumedFiber(food.getFiberPerServing() * quantity);
    }

}