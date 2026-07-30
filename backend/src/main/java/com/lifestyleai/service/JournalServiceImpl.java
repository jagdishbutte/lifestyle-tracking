package com.lifestyleai.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.journal.DailyJournalResponse;
import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;
import com.lifestyleai.entity.Journal;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.BadRequestException;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.JournalRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;
    private final UserHelper userHelper;
    private final ModelMapper mapper;

    @Override
    public JournalResponse addJournal(JournalRequest request) {

        User user = userHelper.getCurrentUser();

        Journal journal = new Journal();
        journal.setTitle(request.getTitle());
        journal.setContent(request.getContent());
        journal.setFavourite(request.getFavourite());
        journal.setUser(user);

        Journal savedJournal = journalRepository.save(journal);

        JournalResponse response = mapper.map(savedJournal, JournalResponse.class);
        response.setUserId(user.getId());

        return response;
    }

    @Override
    public JournalResponse updateJournal(Long journalId, JournalRequest request) {

        Journal journal = findJournal(journalId);

        journal.setTitle(request.getTitle());
        journal.setContent(request.getContent());
        journal.setFavourite(request.getFavourite());

        Journal updatedJournal = journalRepository.save(journal);

        return mapToResponse(updatedJournal);
    }

    @Override
    public void deleteJournal(Long journalId) {

        Journal journal = findJournal(journalId);

        journalRepository.delete(journal);
    }
    
    @Override
    public DailyJournalResponse getTodayJournals() {

        LocalDate today = LocalDate.now();

        List<Journal> journals =
                journalRepository.findByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(
                        userHelper.getCurrentUserId(),
                        today.atStartOfDay(),
                        today.plusDays(1).atStartOfDay());

        return buildDailyJournalResponse(
                journals,
                today);
    }
    
    @Override
    public List<DailyJournalResponse> getJournalHistory(
            Integer days) {

        // User user = userHelper.getCurrentUser();

        if (!List.of(7, 30, 90, 365).contains(days)) {
            throw new BadRequestException("Invalid history period.");
        }

        LocalDate today = LocalDate.now();

        LocalDateTime start =
                today.minusDays(days - 1)
                        .atStartOfDay();

        LocalDateTime end =
                today.plusDays(1)
                        .atStartOfDay();

        List<Journal> journals =
                journalRepository
                        .findByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(
                                userHelper.getCurrentUserId(),
                                start,
                                end);

        Map<LocalDate, List<Journal>> grouped =
                journals.stream()
                        .collect(Collectors.groupingBy(
                                journal -> journal.getCreatedAt().toLocalDate(),
                                LinkedHashMap::new,
                                Collectors.toList()));

        return grouped.entrySet()
                .stream()
                .map(entry ->
                        buildDailyJournalResponse(
                                entry.getValue(),
                                entry.getKey()))
                .toList();
    }
    
    

    /* ==========================================================
                        Helper Methods
       ========================================================== */

    private Journal findJournal(Long journalId) {

        return journalRepository.findById(journalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Journal not found."));
    }

    private JournalResponse mapToResponse(Journal journal) {

        JournalResponse response = mapper.map(journal, JournalResponse.class);

        response.setUserId(journal.getUser().getId());

        return response;
    }
    
    private DailyJournalResponse buildDailyJournalResponse(
            List<Journal> journals,
            LocalDate date) {

        DailyJournalResponse response =
                new DailyJournalResponse();

        response.setDate(date);

        response.setEntryCount(journals.size());

        List<JournalResponse> journalResponses =
                journals.stream()
                        .map(journal -> {

                            JournalResponse dto =
                                    mapper.map(
                                            journal,
                                            JournalResponse.class);

                            dto.setUserId(
                                    journal.getUser().getId());

                            return dto;

                        })
                        .toList();

        response.setJournals(journalResponses);

        return response;
    }

}