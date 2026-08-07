package com.lifestyleai.client;

import com.lifestyleai.dto.ai.AiChatRequest;
import com.lifestyleai.dto.ai.ChatHistoryResponse;
import com.lifestyleai.dto.ai.ChatSessionsListResponse;
import com.lifestyleai.dto.ai.UpdateChatTitleRequest;
import com.lifestyleai.dto.common.ApiResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

@Component
@RequiredArgsConstructor
public class AiServiceClient {

    private final WebClient.Builder webClientBuilder;

    @Value("${ai.service.base-url}")
    private String aiServiceBaseUrl;

    public Flux<ServerSentEvent<String>> streamChat(AiChatRequest request) {

        return webClientBuilder
                .baseUrl(aiServiceBaseUrl)
                .build()
                .post()
                .uri("/chat/stream")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.TEXT_EVENT_STREAM)
                .bodyValue(request)
                .retrieve()
                .bodyToFlux(new ParameterizedTypeReference<ServerSentEvent<String>>() {});
    }
    
    public ApiResponse<ChatSessionsListResponse> getHistory(Long userId) {

        return webClientBuilder
                .baseUrl(aiServiceBaseUrl)
                .build()
                .get()
                .uri("/chat/history/{userId}", userId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<ChatSessionsListResponse>>() {})
                .block();
    }


    public ApiResponse<ChatHistoryResponse> getHistory(
            Long userId,
            String sessionId
    ) {

        return webClientBuilder
                .baseUrl(aiServiceBaseUrl)
                .build()
                .get()
                .uri("/chat/history/{userId}/{sessionId}", userId, sessionId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<ChatHistoryResponse>>() {})
                .block();
    }


    public ApiResponse<String> deleteHistory(
            Long userId,
            String sessionId
    ) {

        return webClientBuilder
                .baseUrl(aiServiceBaseUrl)
                .build()
                .delete()
                .uri("/chat/history/{userId}/{sessionId}", userId, sessionId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<String>>() {})
                .block();
    }


    public ApiResponse<String> updateTitle(
            Long userId,
            String sessionId,
            UpdateChatTitleRequest request
    ) {

        return webClientBuilder
                .baseUrl(aiServiceBaseUrl)
                .build()
                .put()
                .uri("/chat/history/{userId}/{sessionId}/title", userId, sessionId)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ApiResponse<String>>() {})
                .block();
    }
}