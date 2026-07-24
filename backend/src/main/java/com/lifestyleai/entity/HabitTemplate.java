package com.lifestyleai.entity;

import com.lifestyleai.enums.habit.HabitCategory;
import com.lifestyleai.enums.habit.HabitFrequency;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "habit_templates")
@Getter
@Setter
@NoArgsConstructor
public class HabitTemplate extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitFrequency frequency;

    @Column(nullable = false)
    private Boolean isActive = true;

}