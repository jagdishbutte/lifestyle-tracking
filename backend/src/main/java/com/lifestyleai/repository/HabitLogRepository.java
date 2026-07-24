package com.lifestyleai.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lifestyleai.entity.HabitLog;

public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {

    List<HabitLog> findByHabitId(Long habitId);

    List<HabitLog> findByDate(LocalDate date);

    Optional<HabitLog> findByHabitIdAndDate(Long habitId, LocalDate date);

    boolean existsByHabitIdAndDate(Long habitId, LocalDate date);
    
    List<HabitLog> findByHabitUserIdAndDate(Long userId, LocalDate date);

}