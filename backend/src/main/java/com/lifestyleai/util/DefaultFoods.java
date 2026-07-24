package com.lifestyleai.util;

import java.util.ArrayList;
import java.util.List;

import com.lifestyleai.entity.Food;
import com.lifestyleai.enums.food.FoodCategory;
import com.lifestyleai.enums.food.ServingUnit;

public class DefaultFoods {

    public static List<Food> getDefaultFoods() {

        List<Food> foods = new ArrayList<>();

        /* ===========================
         * Fruits
         * =========================== */

        foods.add(create("Apple", FoodCategory.FRUITS, 1.0, ServingUnit.PIECE,
                95.0, 0.5, 25.0, 0.3, 4.4));

        foods.add(create("Banana", FoodCategory.FRUITS, 1.0, ServingUnit.PIECE,
                105.0, 1.3, 27.0, 0.3, 3.1));

        foods.add(create("Orange", FoodCategory.FRUITS, 1.0, ServingUnit.PIECE,
                62.0, 1.2, 15.4, 0.2, 3.1));

        foods.add(create("Mango", FoodCategory.FRUITS, 1.0, ServingUnit.PIECE,
                202.0, 2.8, 50.0, 0.6, 5.4));

        foods.add(create("Watermelon", FoodCategory.FRUITS, 100.0, ServingUnit.GRAM,
                30.0, 0.6, 7.6, 0.2, 0.4));

        /* ===========================
         * Dairy
         * =========================== */

        foods.add(create("Milk", FoodCategory.DAIRY, 250.0, ServingUnit.MILLILITRE,
                150.0, 8.0, 12.0, 8.0, 0.0));

        foods.add(create("Curd", FoodCategory.DAIRY, 100.0, ServingUnit.GRAM,
                98.0, 11.0, 3.4, 4.3, 0.0));

        foods.add(create("Paneer", FoodCategory.DAIRY, 100.0, ServingUnit.GRAM,
                265.0, 18.0, 1.2, 21.0, 0.0));

        /* ===========================
         * Protein
         * =========================== */

        foods.add(create("Egg", FoodCategory.MEAT, 1.0, ServingUnit.PIECE,
                72.0, 6.3, 0.4, 5.0, 0.0));

        foods.add(create("Chicken Breast", FoodCategory.MEAT, 100.0, ServingUnit.GRAM,
                165.0, 31.0, 0.0, 3.6, 0.0));

        foods.add(create("Fish", FoodCategory.SEAFOOD, 100.0, ServingUnit.GRAM,
                206.0, 22.0, 0.0, 12.0, 0.0));

        foods.add(create("Tofu", FoodCategory.MEAT, 100.0, ServingUnit.GRAM,
                144.0, 17.0, 3.0, 9.0, 2.0));

        /* ===========================
         * Grains
         * =========================== */

        foods.add(create("Rice", FoodCategory.GRAINS, 100.0, ServingUnit.GRAM,
                130.0, 2.7, 28.0, 0.3, 0.4));

        foods.add(create("Chapati", FoodCategory.GRAINS, 1.0, ServingUnit.PIECE,
                120.0, 3.0, 20.0, 3.0, 2.5));

        foods.add(create("Oats", FoodCategory.GRAINS, 100.0, ServingUnit.GRAM,
                389.0, 17.0, 66.0, 7.0, 10.6));

        /* ===========================
         * Indian Foods
         * =========================== */

        foods.add(create("Poha", FoodCategory.INDIAN, 1.0, ServingUnit.BOWL,
                250.0, 5.0, 45.0, 5.0, 3.0));

        foods.add(create("Upma", FoodCategory.INDIAN, 1.0, ServingUnit.BOWL,
                220.0, 6.0, 38.0, 6.0, 2.5));

        foods.add(create("Idli", FoodCategory.INDIAN, 1.0, ServingUnit.PIECE,
                58.0, 2.0, 12.0, 0.4, 1.0));

        foods.add(create("Dosa", FoodCategory.INDIAN, 1.0, ServingUnit.PIECE,
                168.0, 4.0, 28.0, 5.0, 2.0));

        foods.add(create("Dal", FoodCategory.INDIAN, 1.0, ServingUnit.BOWL,
                180.0, 9.0, 25.0, 4.0, 6.0));

        foods.add(create("Sambar", FoodCategory.INDIAN, 1.0, ServingUnit.BOWL,
                120.0, 5.0, 16.0, 4.0, 4.0));

        foods.add(create("Khichdi", FoodCategory.INDIAN, 1.0, ServingUnit.BOWL,
                210.0, 8.0, 34.0, 5.0, 5.0));

        /* ===========================
         * Snacks
         * =========================== */

        foods.add(create("Samosa", FoodCategory.SNACKS, 1.0, ServingUnit.PIECE,
                262.0, 4.0, 32.0, 13.0, 2.0));

        foods.add(create("Vada Pav", FoodCategory.SNACKS, 1.0, ServingUnit.PIECE,
                290.0, 7.0, 36.0, 13.0, 3.0));

        foods.add(create("Biscuits", FoodCategory.SNACKS, 2.0, ServingUnit.PIECE,
                140.0, 2.0, 20.0, 5.0, 1.0));

        foods.add(create("Maggi", FoodCategory.SNACKS, 1.0, ServingUnit.PACKET,
                385.0, 8.0, 52.0, 17.0, 2.0));

        /* ===========================
         * Beverages
         * =========================== */

        foods.add(create("Tea", FoodCategory.BEVERAGES, 1.0, ServingUnit.CUP,
                40.0, 1.0, 6.0, 1.5, 0.0));

        foods.add(create("Coffee", FoodCategory.BEVERAGES, 1.0, ServingUnit.CUP,
                30.0, 1.0, 4.0, 1.2, 0.0));

        foods.add(create("Coconut Water", FoodCategory.BEVERAGES, 1.0, ServingUnit.GLASS,
                45.0, 1.7, 9.0, 0.5, 1.0));

        return foods;
    }

    private static Food create(
            String name,
            FoodCategory category,
            Double servingQuantity,
            ServingUnit servingUnit,
            Double calories,
            Double protein,
            Double carbs,
            Double fat,
            Double fiber) {

        Food food = new Food();

        food.setName(name);
        food.setCategory(category);
        food.setServingQuantity(servingQuantity);
        food.setServingUnit(servingUnit);

        food.setCaloriesPerServing(calories);
        food.setProteinPerServing(protein);
        food.setCarbsPerServing(carbs);
        food.setFatPerServing(fat);
        food.setFiberPerServing(fiber);

        food.setIsActive(true);

        return food;
    }
}