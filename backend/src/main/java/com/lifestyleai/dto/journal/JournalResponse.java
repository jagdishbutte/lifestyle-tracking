package com.lifestyleai.dto.journal;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalResponse {

    private Long id;

    private Long userId;

    private String title;

    private String content;

    private Boolean favourite;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}