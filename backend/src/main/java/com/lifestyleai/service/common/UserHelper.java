package com.lifestyleai.service.common;

import org.springframework.stereotype.Component;

import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserHelper {

    private final UserRepository userRepository;

    public User findActiveUser(Long userId) {

        return userRepository
                .findByIdAndIsActiveTrue(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }

}