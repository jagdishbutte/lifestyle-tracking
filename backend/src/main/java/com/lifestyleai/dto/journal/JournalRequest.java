package com.lifestyleai.dto.journal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JournalRequest {

    @NotBlank(message = "Title is required.")
    @Size(max = 150)
    private String title;

    @NotBlank(message = "Journal content is required.")
    private String content;

    private Boolean favourite = false;

}