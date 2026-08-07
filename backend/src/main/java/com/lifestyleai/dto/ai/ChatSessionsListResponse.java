package com.lifestyleai.dto.ai;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatSessionsListResponse {

    private List<ChatSessionItemResponse> sessions;

}