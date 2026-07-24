package com.lifestyleai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lifestyleai.entity.HabitTemplate;

public interface HabitTemplateRepository extends JpaRepository<HabitTemplate, Long> {

    List<HabitTemplate> findByIsActiveTrue();

}