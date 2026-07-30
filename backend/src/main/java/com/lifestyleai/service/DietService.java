package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.food.AddMealRequest;
import com.lifestyleai.dto.food.UpdateDietEntryRequest;
import com.lifestyleai.dto.food.DailyDietResponse;
import com.lifestyleai.dto.food.DietEntryResponse;

public interface DietService {

    /**
     * Adds a complete meal (multiple food items).
     */
    DailyDietResponse addMeal(AddMealRequest request);

    /**
     * Returns diet summary for a specific date.
     */
    DailyDietResponse getDietByDate(LocalDate date);

    /**
     * Returns today's diet summary.
     */
    DailyDietResponse getTodayDiet();

    /**
     * Updates a single food entry.
     */
    DietEntryResponse updateDietEntry(Long dietEntryId, UpdateDietEntryRequest request);

    /**
     * Deletes a single food entry.
     */
    void deleteDietEntry(Long dietEntryId);
    
    
    /**
     * Return diet entries in given date range
     */
    List<DailyDietResponse> getDietHistory(Integer days);

}