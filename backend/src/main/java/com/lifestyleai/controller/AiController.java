package com.lifestyleai.controller;

import com.lifestyleai.dto.ai.ChatHistoryResponse;
import com.lifestyleai.dto.ai.ChatRequest;
import com.lifestyleai.dto.ai.ChatSessionsListResponse;
import com.lifestyleai.dto.ai.UpdateChatTitleRequest;
import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.service.AiChatService;
import com.lifestyleai.service.common.UserHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiChatService aiChatService;
    private final UserHelper userHelper;

    @PostMapping("/chat")
    public SseEmitter chat( @RequestBody ChatRequest request
    ) {

    	Long userId = userHelper.getCurrentUserId();
        SseEmitter emitter = new SseEmitter(0L);

        aiChatService
                .streamChat(userId, request.getQuestion(), request.getSessionId())
                .subscribe(data -> {
                            try {
                                emitter.send(data);
                            }
                            catch (Exception ex) {
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
    @GetMapping("/insights")
    public void getInsights() {

    }

}