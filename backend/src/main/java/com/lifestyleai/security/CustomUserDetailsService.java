package com.lifestyleai.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.lifestyleai.entity.User;
import com.lifestyleai.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(
            String email)
            throws UsernameNotFoundException {

        User user = userRepository
                .findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        return new CustomUserDetails(user);
    }
}