package com.lifestyleai.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "habit_logs",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"habit_id", "log_date"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HabitLog extends BaseEntity {

    @Column(name = "log_date", nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Boolean completed = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id", nullable = false)
    private Habit habit;

}