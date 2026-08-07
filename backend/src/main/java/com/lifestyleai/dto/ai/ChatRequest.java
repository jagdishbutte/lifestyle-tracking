package com.lifestyleai.dto.ai;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatRequest {

    private String question;
    
    private String sessionId;

}