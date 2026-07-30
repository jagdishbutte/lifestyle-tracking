package com.lifestyleai.service;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.auth.LoginRequest;
import com.lifestyleai.dto.auth.LoginResponse;
import com.lifestyleai.dto.auth.RegisterRequest;
import com.lifestyleai.dto.user.UpdatePasswordRequest;
import com.lifestyleai.dto.user.UpdateProfileRequest;
import com.lifestyleai.dto.user.UserResponse;
import com.lifestyleai.entity.User;
import com.lifestyleai.enums.user.UserRole;
import com.lifestyleai.exception.BadCredentialsException;
import com.lifestyleai.repository.UserRepository;
import com.lifestyleai.security.CustomUserDetails;
import com.lifestyleai.security.JwtService;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final HabitTemplateService habitTemplateService;
	private final UserHelper userHelper;
	private final ModelMapper mapper;
	private final AuthenticationManager authenticationManager;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	@Override
	public UserResponse register(RegisterRequest request) {

	    if (userRepository.existsByEmail(request.getEmail())) {
	        throw new BadCredentialsException("Email already exists.");
	    }

	    User user = mapper.map(request, User.class);
	    user.setPassword(passwordEncoder.encode(request.getPassword()));
	    user.setRole(UserRole.USER);
	    User savedUser = userRepository.save(user);
	    
	    habitTemplateService.initializeUserHabits(savedUser);

	    return mapper.map(savedUser, UserResponse.class);
	}

	@Override
	public LoginResponse login(LoginRequest request) {

		Authentication authentication =
		        authenticationManager.authenticate(
		                UsernamePasswordAuthenticationToken.unauthenticated(
		                        request.getEmail(),
		                        request.getPassword()));

		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

		User user = userDetails.getUser();

	    LoginResponse response = new LoginResponse();

	    response.setUserId(user.getId());
	    response.setFirstName(user.getFirstName());
	    response.setLastName(user.getLastName());
	    response.setEmail(user.getEmail());
	    response.setRole(user.getRole());

	    response.setToken(jwtService.generateToken(user));

	    return response;
	}

	@Override
	public UserResponse getUserById() {

		User user = userHelper.getCurrentUser();

	    return mapper.map(user, UserResponse.class);
	}

	@Override
	public List<UserResponse> getAllUsers() {

	    List<User> users = userRepository.findByIsActiveTrue();

	    return users.stream()
	            .map(user -> mapper.map(user, UserResponse.class))
	            .toList();
	}

	@Override
	public UserResponse updateProfile(UpdateProfileRequest request) {

		User user = userHelper.getCurrentUser();

	    user.setGender(request.getGender());
	    user.setDateOfBirth(request.getDateOfBirth());
	    user.setHeight(request.getHeight());
	    user.setWeight(request.getWeight());
	    user.setTargetWeight(request.getTargetWeight());
	    user.setActivityLevel(request.getActivityLevel());
	    user.setOccupation(request.getOccupation());
	    user.setMonthlyIncome(request.getMonthlyIncome());
	    user.setCurrency(request.getCurrency());
	    user.setSleepGoalHours(request.getSleepGoalHours());
	    user.setWaterGoalGlasses(request.getWaterGoalGlasses());
	    user.setStepsGoal(request.getStepsGoal());
	    user.setDailyCalorieGoal(request.getDailyCalorieGoal());

	    userRepository.save(user);

	    return mapper.map(user, UserResponse.class);
	}

	@Override
	public void updatePassword(UpdatePasswordRequest request) {

		User user = userHelper.getCurrentUser();

	    // Later:
	    // validate current password
	    // encrypt new password

	    user.setPassword(request.getNewPassword());

	    userRepository.save(user);
	}

	@Override
	public void deleteUser() {

		User user = userHelper.getCurrentUser();

		user.setIsActive(false);

		userRepository.save(user);
	}

}
