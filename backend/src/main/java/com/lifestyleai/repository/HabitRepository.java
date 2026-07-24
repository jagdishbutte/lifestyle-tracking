package com.lifestyleai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lifestyleai.entity.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {

    List<Habit> findByUserId(Long userId);

    List<Habit> findByUserIdAndIsActiveTrue(Long userId);

}