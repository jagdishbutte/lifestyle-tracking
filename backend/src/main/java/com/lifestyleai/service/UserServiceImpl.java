package com.lifestyleai.service;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.lifestyleai.dto.LoginRequest;
import com.lifestyleai.dto.LoginResponse;
import com.lifestyleai.dto.RegisterRequest;
import com.lifestyleai.dto.UserResponse;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.UnauthorizedException;
import com.lifestyleai.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final ModelMapper mapper;

	@Override
	public UserResponse register(RegisterRequest request) {
		
		if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }
		
		User user = mapper.map(request, User.class);
		
        userRepository.save(user);
        
        UserResponse response = new UserResponse();
        
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
		
        return response;
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));
		
		LoginResponse response = new LoginResponse();

        response.setUserId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());

        return response;
	}

}
