package com.lifestyleai.controller;

import com.lifestyleai.dto.ai.ChatRequest;
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
                .streamChat(userId, request.getQuestion())
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

    @GetMapping("/insights")
    public void getInsights() {

    }

}