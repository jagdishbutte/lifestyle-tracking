package com.lifestyleai.dto.expense;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.lifestyleai.enums.expense.ExpenseCategory;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ExpenseRequest {

    @NotBlank(message = "Expense name is required")
    private String expenseName;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Category is required")
    private ExpenseCategory category;

    private String description;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;

}
