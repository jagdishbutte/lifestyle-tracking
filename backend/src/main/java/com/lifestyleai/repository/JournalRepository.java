package com.lifestyleai.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifestyleai.entity.Journal;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

    List<Journal> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Journal> findByUserIdAndFavouriteTrueOrderByCreatedAtDesc(Long userId);

    List<Journal> findByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(
            Long userId,
            LocalDateTime start,
            LocalDateTime end);
    
    List<Journal> findByUserIdAndCreatedAtAfterOrderByCreatedAtDesc(
            Long userId,
            LocalDateTime start);

}