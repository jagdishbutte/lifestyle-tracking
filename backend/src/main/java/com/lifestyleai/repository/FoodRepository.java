package com.lifestyleai.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifestyleai.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> findByIsActiveTrue();

    Optional<Food> findByIdAndIsActiveTrue(Long id);

    List<Food> findByNameContainingIgnoreCaseAndIsActiveTrueOrderByNameAsc(String keyword);

}