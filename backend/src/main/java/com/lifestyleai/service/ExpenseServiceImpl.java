package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.lifestyleai.dto.expense.ExpenseRequest;
import com.lifestyleai.dto.expense.ExpenseResponse;
import com.lifestyleai.entity.Expense;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.ExpenseRepository;
import com.lifestyleai.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
	
	private final ExpenseRepository expenseRepository;
	private final UserRepository userRepository;
	private final ModelMapper mapper;

	private Expense findExpenseById(Long id) {
	    return expenseRepository.findById(id)
	    		.orElseThrow(() -> new ResourceNotFoundException("Expense not found."));
	}
	
	@Override
	public ExpenseResponse addExpense(ExpenseRequest request) {

		User user = userRepository.findById(request.getUserId())
	            .orElseThrow(() -> new ResourceNotFoundException("User not found."));

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
	public ExpenseResponse getExpenseById(Long id) {

	    Expense expense = findExpenseById(id);

	    ExpenseResponse response = mapper.map(expense, ExpenseResponse.class);
	    response.setUserId(expense.getUser().getId());

	    return response;
	}

	@Override
	public List<ExpenseResponse> getAllExpenses() {

	    return expenseRepository.findAll()
	            .stream()
	            .map(expense -> {
	                ExpenseResponse response = mapper.map(expense, ExpenseResponse.class);
	                response.setUserId(expense.getUser().getId());
	                return response;
	            })
	            .toList();
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
	public List<ExpenseResponse> getExpensesByDate(LocalDate expenseDate) {

	    return expenseRepository.findByExpenseDate(expenseDate)
	            .stream()
	            .map(expense -> {
	                ExpenseResponse response = mapper.map(expense, ExpenseResponse.class);
	                response.setUserId(expense.getUser().getId());
	                return response;
	            })
	            .toList();
	}

}
