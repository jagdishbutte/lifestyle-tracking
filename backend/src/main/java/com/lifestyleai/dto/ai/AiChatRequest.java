package com.lifestyleai.dto.ai;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AiChatRequest {

	@JsonProperty("user_id")
    private Long userId;
    
    @JsonProperty("session_id")
    private String sessionId;
    
    private String question;

}