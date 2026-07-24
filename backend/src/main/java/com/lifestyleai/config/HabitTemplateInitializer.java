package com.lifestyleai.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.lifestyleai.repository.HabitTemplateRepository;
import com.lifestyleai.util.DefaultHabitTemplates;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class HabitTemplateInitializer implements CommandLineRunner {

    private final HabitTemplateRepository habitTemplateRepository;

    @Override
    public void run(String... args) {
        if (habitTemplateRepository.count() == 0) {
            habitTemplateRepository.saveAll(DefaultHabitTemplates.getDefaultTemplates());
            log.info("Default habit templates initialized.");
        }
    }
}