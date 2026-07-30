package com.lifestyleai.service;

import java.util.List;

import com.lifestyleai.dto.journal.DailyJournalResponse;
import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;

public interface JournalService {

    JournalResponse addJournal(JournalRequest request);

    JournalResponse updateJournal(Long journalId, JournalRequest request);

    void deleteJournal(Long journalId);
    
    /**
     * Returns today's journal entries.
     */
    DailyJournalResponse getTodayJournals();

    /**
     * Returns journal history for the last N days.
     */
    List<DailyJournalResponse> getJournalHistory(
            Integer days);

}