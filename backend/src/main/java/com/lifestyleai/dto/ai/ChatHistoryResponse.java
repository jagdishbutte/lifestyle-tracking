package com.lifestyleai.dto.ai;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
public class ChatHistoryResponse {

	@JsonProperty("session_id")
    private String sessionId;

    private String title;

    private List<ChatHistoryItemResponse> messages;

}