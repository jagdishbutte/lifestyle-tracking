package com.lifestyleai.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lifestyleai.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByExpenseDate(LocalDate expenseDate);
    
    List<Expense> findByUserId(Long userId);

    List<Expense> findByUserIdAndExpenseDate(Long userId, LocalDate expenseDate);
    
    List<Expense> findByUserIdAndExpenseDateBetweenOrderByExpenseDateDesc(
            Long userId,
            LocalDate startDate,
            LocalDate endDate);

}