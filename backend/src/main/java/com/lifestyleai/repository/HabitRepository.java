package com.lifestyleai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lifestyleai.entity.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {

    List<Habit> findByUserId(Long userId);

    List<Habit> findByUserIdAndIsActiveTrue(Long userId);
    
    Optional<Habit> findByIdAndUserIdAndIsActiveTrue(
            Long habitId,
            Long userId);
    
    @Query("""
    		SELECT COUNT(h)
    		FROM Habit h
    		WHERE h.user.id = :userId
    		AND h.isActive = true
    		""")
    		Long countTotalHabits(Long userId);

}