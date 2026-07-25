package com.lifestyleai.dto.checkin;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyCheckInRequest {

    @NotNull
    private Long userId;

    @NotNull
    @DecimalMin("0.0")
    private Double sleepHours;

    @NotNull
    @Min(0)
    private Integer waterGlasses;

    @NotNull
    @Min(0)
    private Integer stepsWalked;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer wellbeingScore;

}