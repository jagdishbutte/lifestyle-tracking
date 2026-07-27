package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponse>> getExpenseById(
            @PathVariable Long id) {

        ExpenseResponse response = expenseService.getExpenseById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expense retrieved successfully.",
                        response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ExpenseResponse>>> getAllExpenses() {

        List<ExpenseResponse> response = expenseService.getAllExpenses();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expenses retrieved successfully.",
                        response));
    }

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
    
    @GetMapping("/date/{expenseDate}")
    public ResponseEntity<ApiResponse<List<ExpenseResponse>>> getExpensesByDate(
            @PathVariable LocalDate expenseDate) {

        List<ExpenseResponse> response = expenseService.getExpensesByDate(expenseDate);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Expenses retrieved successfully.",
                        response));
    }
    
}