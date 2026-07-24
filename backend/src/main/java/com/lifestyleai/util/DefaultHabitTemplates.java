package com.lifestyleai.util;

import java.util.ArrayList;
import java.util.List;

import com.lifestyleai.entity.HabitTemplate;
import com.lifestyleai.enums.habit.HabitCategory;
import com.lifestyleai.enums.habit.HabitFrequency;

public final class DefaultHabitTemplates {

    private DefaultHabitTemplates() {
    }

    public static List<HabitTemplate> getDefaultTemplates() {

        List<HabitTemplate> templates = new ArrayList<>();

        templates.add(create("Drink 3L Water", HabitCategory.HEALTH));
        templates.add(create("Exercise", HabitCategory.FITNESS));
        templates.add(create("Walk 8000 Steps", HabitCategory.FITNESS));
        templates.add(create("Read Book", HabitCategory.LEARNING));
        templates.add(create("Meditation", HabitCategory.MINDFULNESS));
        templates.add(create("Sleep Before 11 PM", HabitCategory.HEALTH));
        templates.add(create("No Junk Food", HabitCategory.HEALTH));
        templates.add(create("Practice Coding", HabitCategory.LEARNING));
        templates.add(create("Track Expenses", HabitCategory.FINANCE));
        templates.add(create("Write Journal", HabitCategory.PERSONAL));

        return templates;
    }

    private static HabitTemplate create(String name, HabitCategory category) {

        HabitTemplate habit = new HabitTemplate();

        habit.setName(name);
        habit.setCategory(category);
        habit.setFrequency(HabitFrequency.DAILY);
        habit.setIsActive(true);

        return habit;
    }

}