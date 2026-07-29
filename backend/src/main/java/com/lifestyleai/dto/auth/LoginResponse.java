package com.lifestyleai.dto.auth;

import com.lifestyleai.enums.user.UserRole;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;
    
    private UserRole role;
    
    private String token;

    private String tokenType = "Bearer";

}