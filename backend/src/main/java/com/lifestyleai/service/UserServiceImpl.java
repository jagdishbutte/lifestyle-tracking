package com.lifestyleai.service;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.auth.LoginRequest;
import com.lifestyleai.dto.auth.LoginResponse;
import com.lifestyleai.dto.auth.RegisterRequest;
import com.lifestyleai.dto.user.UpdatePasswordRequest;
import com.lifestyleai.dto.user.UpdateProfileRequest;
import com.lifestyleai.dto.user.UserResponse;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.exception.UnauthorizedException;
import com.lifestyleai.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final HabitTemplateService habitTemplateService;
	private final ModelMapper mapper;
	
	private User findUserById(Long id) {
	    return userRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found."));
	}

	@Override
	public UserResponse register(RegisterRequest request) {
		
		if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }
		
		User user = mapper.map(request, User.class);
		
		User savedUser = userRepository.save(user);
		
		habitTemplateService.initializeUserHabits(savedUser);
		
        return mapper.map(savedUser, UserResponse.class);
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        return mapper.map(user, LoginResponse.class);
	}

	@Override
	public UserResponse getUserById(Long id) {

		User user = findUserById(id);

	    return mapper.map(user, UserResponse.class);
	}

	@Override
	public List<UserResponse> getAllUsers() {

	    List<User> users = userRepository.findAll();

	    return users.stream()
	            .map(user -> mapper.map(user, UserResponse.class))
	            .toList();
	}

	@Override
	public UserResponse updateProfile(Long id, UpdateProfileRequest request) {

		User user = findUserById(id);

	    user.setGender(request.getGender());
	    user.setDateOfBirth(request.getDateOfBirth());
	    user.setHeight(request.getHeight());
	    user.setWeight(request.getWeight());
	    user.setTargetWeight(request.getTargetWeight());
	    user.setActivityLevel(request.getActivityLevel());
	    user.setOccupation(request.getOccupation());
	    user.setMonthlyIncome(request.getMonthlyIncome());
	    user.setCurrency(request.getCurrency());

	    userRepository.save(user);

	    return mapper.map(user, UserResponse.class);
	}

	@Override
	public void updatePassword(Long id, UpdatePasswordRequest request) {

		User user = findUserById(id);

	    // Later:
	    // validate current password
	    // encrypt new password

	    user.setPassword(request.getNewPassword());

	    userRepository.save(user);
	}

	@Override
	public void deleteUser(Long id) {

		User user = findUserById(id);

	    userRepository.delete(user);
	}

}
