package com.lifestyleai.service;

import java.util.List;

import com.lifestyleai.dto.expense.DailyExpenseResponse;
import com.lifestyleai.dto.expense.ExpenseRequest;
import com.lifestyleai.dto.expense.ExpenseResponse;

public interface ExpenseService {

    ExpenseResponse addExpense(ExpenseRequest request);

    ExpenseResponse updateExpense(Long id, ExpenseRequest request);

    void deleteExpense(Long id);
	
	/**
	 * Returns today's expense summary.
	 */
	DailyExpenseResponse getTodayExpenses(Long userId);

	/**
	 * Returns expense history for the last N days.
	 */
	List<DailyExpenseResponse> getExpenseHistory(
	        Long userId,
	        Integer days);

}