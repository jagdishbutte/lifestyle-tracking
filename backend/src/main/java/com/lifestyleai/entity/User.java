package com.lifestyleai.entity;

import com.lifestyleai.enums.user.ActivityLevel;
import com.lifestyleai.enums.user.CurrencyType;
import com.lifestyleai.enums.user.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate dateOfBirth;

    private Double height;

    private Double weight;

    private Double targetWeight;

    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;

    @Column(length = 100)
    private String occupation;

    @Column(precision = 12, scale = 2)
    private BigDecimal monthlyIncome;

    @Enumerated(EnumType.STRING)
    private CurrencyType currency;

}