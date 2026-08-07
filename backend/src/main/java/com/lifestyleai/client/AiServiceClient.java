package com.lifestyleai.client;

import com.lifestyleai.dto.ai.AiChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Component
@RequiredArgsConstructor
public class AiServiceClient {

    private final WebClient.Builder webClientBuilder;

    @Value("${ai.service.base-url}")
    private String aiServiceBaseUrl;

    public Flux<String> streamChat(AiChatRequest request) {

    	return webClientBuilder
    	        .baseUrl(aiServiceBaseUrl)
    	        .build()
    	        .post()
    	        .uri("/chat/stream")
    	        .contentType(MediaType.APPLICATION_JSON)
    	        .accept(MediaType.TEXT_EVENT_STREAM)
    	        .bodyValue(request)
    	        .retrieve()
    	        .bodyToFlux(String.class);
    }
}