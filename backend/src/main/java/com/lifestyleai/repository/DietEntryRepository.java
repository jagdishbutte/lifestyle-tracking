package com.lifestyleai.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lifestyleai.entity.DietEntry;

@Repository
public interface DietEntryRepository extends JpaRepository<DietEntry, Long> {

    List<DietEntry> findByUserIdAndConsumedDate(Long userId, LocalDate date);

    List<DietEntry> findByUserIdAndConsumedDateBetween(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
    
    @Query("""
    		SELECT COALESCE(SUM(d.consumedCalories), 0)
    		FROM DietEntry d
    		WHERE d.user.id = :userId
    		AND d.consumedDate = :date
    		""")
    		Double getTotalCaloriesByUserAndDate(Long userId, LocalDate date);
}