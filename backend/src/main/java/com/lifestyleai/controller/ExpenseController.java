package com.lifestyleai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.expense.DailyExpenseResponse;
import com.lifestyleai.dto.expense.ExpenseRequest;
import com.lifestyleai.dto.expense.ExpenseResponse;
import com.lifestyleai.service.ExpenseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    /**
     * Method   : POST
     * API      : /api/expenses
     * Function : Creates a new expense.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ExpenseResponse>> addExpense(
            @Valid @RequestBody ExpenseRequest request) {

        ExpenseResponse response = expenseService.addExpense(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Expense added successfully.",
                        response));
    }

    /**
     * Method   : PUT
     * API      : /api/expenses/{id}
     * Function : Updates an existing expense.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponse>> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {

        ExpenseResponse response = expenseService.updateExpense(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expense updated successfully.",
                        response));
    }

    /**
     * Method   : DELETE
     * API      : /api/expenses/{id}
     * Function : Deletes an expense.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expense deleted successfully.",
                        null));
    }
    
    /**
     * Method   : GET
     * API      : /api/expenses/user/{userId}/today
     * Function : Returns today's expense summary.
     */
    @GetMapping("/user/{userId}/today")
    public ResponseEntity<ApiResponse<DailyExpenseResponse>> getTodayExpenses(
            @PathVariable Long userId) {

        DailyExpenseResponse response =
                expenseService.getTodayExpenses(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Today's expenses retrieved successfully.",
                        response));
    }
    
    /**
     * Method   : GET
     * API      : /api/expenses/user/{userId}/history?days=7
     * Function : Returns expense history for the last N days.
     */
    @GetMapping("/user/{userId}/history")
    public ResponseEntity<ApiResponse<List<DailyExpenseResponse>>> getExpenseHistory(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "7") Integer days) {

        List<DailyExpenseResponse> response =
                expenseService.getExpenseHistory(
                        userId,
                        days);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expense history retrieved successfully.",
                        response));
    }
    
}