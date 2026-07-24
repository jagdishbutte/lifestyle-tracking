package com.lifestyleai.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.lifestyleai.repository.FoodRepository;
import com.lifestyleai.util.DefaultFoods;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class FoodInitializer implements CommandLineRunner {

    private final FoodRepository foodRepository;

    @Override
    public void run(String... args) {

        if (foodRepository.findByIsActiveTrue().isEmpty()) {

            foodRepository.saveAll(DefaultFoods.getDefaultFoods());

            log.info("Default food master initialized successfully.");
        }
    }
}