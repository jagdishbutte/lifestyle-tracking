package com.lifestyleai.service;

import com.lifestyleai.client.AiServiceClient;
import com.lifestyleai.dto.ai.AiChatRequest;
import com.lifestyleai.dto.ai.ChatHistoryResponse;
import com.lifestyleai.dto.ai.ChatSessionsListResponse;
import com.lifestyleai.dto.ai.UpdateChatTitleRequest;
import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final AiServiceClient aiServiceClient;
    private final UserHelper userHelper;

    public Flux<ServerSentEvent<String>> streamChat(
            String question,
            String sessionId
    ) {

        AiChatRequest request = new AiChatRequest(
        		userHelper.getCurrentUserId(),
                question,
                sessionId
        );
        
        System.out.print(request + "catching the request");

        return aiServiceClient.streamChat(request);
    }
    
    public ApiResponse<ChatSessionsListResponse> getHistory() {

    	return aiServiceClient.getHistory(userHelper.getCurrentUserId());
    }


    public ApiResponse<ChatHistoryResponse> getHistory(String sessionId) {

        return aiServiceClient.getHistory(userHelper.getCurrentUserId(), sessionId);
    }


    public ApiResponse<String> deleteHistory(String sessionId) {

        return aiServiceClient.deleteHistory(userHelper.getCurrentUserId(), sessionId);
    }
    
    public ApiResponse<String> updateTitle(String sessionId, UpdateChatTitleRequest request){

        return aiServiceClient.updateTitle(
        		userHelper.getCurrentUserId(),
                sessionId,
                request
        );
    }

}