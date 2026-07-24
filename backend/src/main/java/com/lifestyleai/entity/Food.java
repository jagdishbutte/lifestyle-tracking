package com.lifestyleai.entity;

import com.lifestyleai.enums.food.FoodCategory;
import com.lifestyleai.enums.food.ServingUnit;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "foods")
@Getter
@Setter
@NoArgsConstructor
public class Food extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category;

    @Column(nullable = false)
    private Double servingQuantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServingUnit servingUnit;

    @Column(nullable = false)
    private Double caloriesPerServing;

    @Column(nullable = false)
    private Double proteinPerServing;

    @Column(nullable = false)
    private Double carbsPerServing;

    @Column(nullable = false)
    private Double fatPerServing;

    @Column(nullable = false)
    private Double fiberPerServing;

    @Column(nullable = false)
    private Boolean isActive = true;
}