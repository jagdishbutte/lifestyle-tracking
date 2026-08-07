package com.lifestyleai.dto.ai;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatSessionItemResponse {

	@JsonProperty("session_id")
    private String sessionId;

    private String title;

}