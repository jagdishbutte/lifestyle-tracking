package com.lifestyleai.service;

import java.time.LocalDate;
import java.util.List;

import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;

public interface JournalService {

    JournalResponse addJournal(JournalRequest request);

    JournalResponse getJournalById(Long journalId);

    List<JournalResponse> getAllJournals(Long userId);

    JournalResponse updateJournal(Long journalId, JournalRequest request);

    void deleteJournal(Long journalId);

    List<JournalResponse> getJournalsByDate(Long userId, LocalDate date);

    List<JournalResponse> searchJournals(Long userId, String keyword);

}