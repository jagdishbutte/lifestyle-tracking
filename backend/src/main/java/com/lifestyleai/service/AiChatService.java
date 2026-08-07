package com.lifestyleai.service;

import com.lifestyleai.client.AiServiceClient;
import com.lifestyleai.dto.ai.AiChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final AiServiceClient aiServiceClient;

    public Flux<String> streamChat(Long userId, String question) {

        AiChatRequest request = new AiChatRequest(
                userId,
                question
        );

        return aiServiceClient.streamChat(request);
    }

}