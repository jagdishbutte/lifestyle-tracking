package com.lifestyleai.controller;

import com.lifestyleai.dto.ai.ChatHistoryResponse;
import com.lifestyleai.dto.ai.ChatRequest;
import com.lifestyleai.dto.ai.ChatSessionsListResponse;
import com.lifestyleai.dto.ai.UpdateChatTitleRequest;
import com.lifestyleai.dto.ai.WeeklyInsightsResponse;
import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.service.AiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public SseEmitter chat(
            @RequestBody ChatRequest request
    ) {

        SseEmitter emitter = new SseEmitter(0L);

        aiChatService
                .streamChat(
                        request.getQuestion(),
                        request.getSessionId()
                )
                .subscribe(
                        event -> {
                            try {

                                emitter.send(
                                        SseEmitter.event()
                                                .name(event.event())
                                                .data(event.data())
                                );

                            } catch (Exception ex) {
                                emitter.completeWithError(ex);
                            }
                        },
                        emitter::completeWithError,
                        emitter::complete
                );

        return emitter;
    }
    
    @GetMapping("/history")
    public ApiResponse<ChatSessionsListResponse> getHistory() {

        return aiChatService.getHistory();
    }


    @GetMapping("/history/{sessionId}")
    public ApiResponse<ChatHistoryResponse> getHistory(
            @PathVariable String sessionId
    ) {

        return aiChatService.getHistory(sessionId);
    }


    @DeleteMapping("/chat/{sessionId}")
    public ApiResponse<String> deleteHistory(
            @PathVariable String sessionId
    ) {

        return aiChatService.deleteHistory(sessionId);
    }


    @PutMapping("/history/{sessionId}/title")
    public ApiResponse<String> updateTitle(
            @PathVariable String sessionId,
            @RequestBody UpdateChatTitleRequest request
    ) {

        return aiChatService.updateTitle(
                sessionId,
                request
        );
    }
    
    @PostMapping("/insights/refresh")
    public ApiResponse<String> refreshInsights() {

        return aiChatService.refreshInsights();
    }

    @GetMapping("/insights")
    public ApiResponse<WeeklyInsightsResponse> getLatestInsights() {

        return aiChatService.getLatestInsights();
    }

}