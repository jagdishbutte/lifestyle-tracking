package com.lifestyleai.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.expense.DailyExpenseResponse;
import com.lifestyleai.dto.expense.ExpenseRequest;
import com.lifestyleai.dto.expense.ExpenseResponse;
import com.lifestyleai.entity.Expense;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.BadRequestException;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.ExpenseRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
	
	private final ExpenseRepository expenseRepository;
	private final UserHelper userHelper;
	private final ModelMapper mapper;
	
	@Override
	public ExpenseResponse addExpense(ExpenseRequest request) {

		User user = userHelper.getCurrentUser();

		Expense expense = new Expense();

		expense.setExpenseName(request.getExpenseName());
		expense.setAmount(request.getAmount());
		expense.setCategory(request.getCategory());
		expense.setDescription(request.getDescription());
		expense.setExpenseDate(request.getExpenseDate());
		expense.setUser(user);
		
//		System.out.println("Expense ID = " + expense.getId());

	    Expense savedExpense = expenseRepository.save(expense);

	    ExpenseResponse response = mapper.map(savedExpense, ExpenseResponse.class);
	    response.setUserId(user.getId());

	    return response;
	}

	@Override
	public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {

		Expense expense = findExpenseById(id);

	    expense.setExpenseName(request.getExpenseName());
	    expense.setAmount(request.getAmount());
	    expense.setCategory(request.getCategory());
	    expense.setDescription(request.getDescription());
	    expense.setExpenseDate(request.getExpenseDate());

	    Expense updatedExpense = expenseRepository.save(expense);

	    ExpenseResponse response = mapper.map(updatedExpense, ExpenseResponse.class);
	    response.setUserId(updatedExpense.getUser().getId());

	    return response;
	}

	@Override
	public void deleteExpense(Long id) {

		Expense expense = findExpenseById(id);
		
	    expenseRepository.delete(expense);
	}
	
	@Override
	public DailyExpenseResponse getTodayExpenses() {

	    return buildDailyExpenseResponse(
	            expenseRepository.findByUserIdAndExpenseDate(
	                    userHelper.getCurrentUserId(),
	                    LocalDate.now()),
	            LocalDate.now());
	}
	
	@Override
	public List<DailyExpenseResponse> getExpenseHistory(
	        Integer days) {

	    if (!List.of(7, 30, 90, 365).contains(days)) {
	        throw new BadRequestException("Invalid history period.");
	    }

	    LocalDate endDate = LocalDate.now();

	    LocalDate startDate =
	            endDate.minusDays(days - 1);

	    List<Expense> expenses =
	            expenseRepository
	                    .findByUserIdAndExpenseDateBetweenOrderByExpenseDateDesc(
	                            userHelper.getCurrentUserId(),
	                            startDate,
	                            endDate);

	    Map<LocalDate, List<Expense>> grouped =
	            expenses.stream()
	                    .collect(Collectors.groupingBy(
	                            Expense::getExpenseDate,
	                            LinkedHashMap::new,
	                            Collectors.toList()));

	    return grouped.entrySet()
	            .stream()
	            .map(entry ->
	                    buildDailyExpenseResponse(
	                            entry.getValue(),
	                            entry.getKey()))
	            .toList();
	}
	
	
	 /* ==========================================================
    	Helper Methods
		========================================================== */
	
	private Expense findExpenseById(Long id) {
	    return expenseRepository.findById(id)
	    		.orElseThrow(() -> new ResourceNotFoundException("Expense not found."));
	}
	
	private DailyExpenseResponse buildDailyExpenseResponse(
	        List<Expense> expenses,
	        LocalDate date) {

	    DailyExpenseResponse response =
	            new DailyExpenseResponse();

	    response.setDate(date);

	    List<ExpenseResponse> expenseResponses =
	            expenses.stream()
	                    .map(expense -> {

	                        ExpenseResponse dto =
	                                mapper.map(
	                                        expense,
	                                        ExpenseResponse.class);

	                        dto.setUserId(
	                                expense.getUser().getId());

	                        return dto;

	                    })
	                    .toList();

	    response.setExpenses(expenseResponses);

	    BigDecimal totalAmount =
	            expenses.stream()
	                    .map(Expense::getAmount)
	                    .reduce(
	                            BigDecimal.ZERO,
	                            BigDecimal::add);

	    response.setTotalAmount(totalAmount);

	    return response;
	}
}
