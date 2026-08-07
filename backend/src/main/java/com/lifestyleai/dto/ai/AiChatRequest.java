package com.lifestyleai.dto.ai;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class AiChatRequest {

	@JsonProperty("user_id")
    private Long userId;
    
    private String question;
    
    @JsonProperty("session_id")
    private String sessionId;

}