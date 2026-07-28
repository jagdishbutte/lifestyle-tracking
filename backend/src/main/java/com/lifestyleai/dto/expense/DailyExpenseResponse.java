package com.lifestyleai.dto.expense;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyExpenseResponse {

    private LocalDate date;

    private BigDecimal totalAmount;

    private List<ExpenseResponse> expenses;

}