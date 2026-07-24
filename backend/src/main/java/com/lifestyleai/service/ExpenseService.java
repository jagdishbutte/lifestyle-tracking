package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.expense.ExpenseRequest;
import com.lifestyleai.dto.expense.ExpenseResponse;

public interface ExpenseService {

    ExpenseResponse addExpense(ExpenseRequest request);

    ExpenseResponse getExpenseById(Long id);

    List<ExpenseResponse> getAllExpenses();

    ExpenseResponse updateExpense(Long id, ExpenseRequest request);

    void deleteExpense(Long id);

	List<ExpenseResponse> getExpensesByDate(LocalDate expenseDate);

}