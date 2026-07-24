package com.lifestyleai.dto.expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.lifestyleai.enums.expense.ExpenseCategory;

import lombok.Data;

@Data
public class ExpenseResponse {

    private Long id;

    private String expenseName;

    private BigDecimal amount;

    private ExpenseCategory category;

    private String description;

    private LocalDate expenseDate;

    private Long userId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}