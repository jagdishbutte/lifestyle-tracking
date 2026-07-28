package com.lifestyleai.dto.journal;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DailyJournalResponse {

    private LocalDate date;

    private Integer entryCount;

    private List<JournalResponse> journals;

}