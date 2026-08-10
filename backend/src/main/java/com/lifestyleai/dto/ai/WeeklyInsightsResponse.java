package com.lifestyleai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyInsightsResponse {

	@JsonProperty("user_id")
    private Long userId;

	@JsonProperty("insight_id")
    private String insightId;

    private Insights insights;

    private List<String> recommendations;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Insights {

        private String checkins;
        private String habits;
        private String diet;
        private String expenses;
        private String journal;

    }

}