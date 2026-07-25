package com.lifestyleai.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifestyleai.entity.DailyCheckIn;

@Repository
public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, Long> {

    Optional<DailyCheckIn> findByUserIdAndDate(Long userId, LocalDate date);

}