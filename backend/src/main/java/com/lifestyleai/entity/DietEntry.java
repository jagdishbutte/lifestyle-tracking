package com.lifestyleai.entity;

import java.time.LocalDate;

import com.lifestyleai.enums.food.MealType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "diet_entries")
@Getter
@Setter
@NoArgsConstructor
public class DietEntry extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MealType mealType;

    @Column(nullable = false)
    private Double quantityConsumed;

    @Column(nullable = false)
    private Double consumedCalories;

    @Column(nullable = false)
    private Double consumedProtein;

    @Column(nullable = false)
    private Double consumedCarbs;

    @Column(nullable = false)
    private Double consumedFat;

    @Column(nullable = false)
    private Double consumedFiber;

    @Column(nullable = false)
    private LocalDate consumedDate;
}