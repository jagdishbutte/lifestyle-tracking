package com.lifestyleai.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
    
    @Query("""
    		SELECT j
    		FROM Journal j
    		WHERE j.user.id = :userId
    		AND (
    		    LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
    		    OR
    		    LOWER(j.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
    		)
    		ORDER BY j.createdAt DESC
    		""")
    		List<Journal> searchJournal(Long userId, String keyword);

}