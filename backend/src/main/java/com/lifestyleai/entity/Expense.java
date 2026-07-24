package com.lifestyleai.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.lifestyleai.enums.expense.ExpenseCategory;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Expense extends BaseEntity {

    @Column(nullable = false)
    private String expenseName;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExpenseCategory category;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private LocalDate expenseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}