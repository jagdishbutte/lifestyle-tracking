package com.lifestyleai.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "daily_check_ins",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "date"})
    }
)
@Getter
@Setter
@NoArgsConstructor
public class DailyCheckIn extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Double sleepHours;

    @Column(nullable = false)
    private Integer waterGlasses;

    @Column(nullable = false)
    private Integer stepsWalked;

    @Column(nullable = false)
    private Integer wellbeingScore;

}