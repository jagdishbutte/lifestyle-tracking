package com.lifestyleai.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;
import com.lifestyleai.entity.Journal;
import com.lifestyleai.entity.User;
import com.lifestyleai.exception.ResourceNotFoundException;
import com.lifestyleai.repository.JournalRepository;
import com.lifestyleai.service.common.UserHelper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;
    private final UserHelper userLookupService;
    private final ModelMapper mapper;

    @Override
    public JournalResponse addJournal(JournalRequest request) {

        User user = userLookupService.findActiveUser(request.getUserId());

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
    @Transactional(readOnly = true)
    public JournalResponse getJournalById(Long journalId) {

        Journal journal = findJournal(journalId);

        JournalResponse response = mapper.map(journal, JournalResponse.class);
        response.setUserId(journal.getUser().getId());

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<JournalResponse> getAllJournals(Long userId) {

        userLookupService.findActiveUser(userId);

        return journalRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
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
    @Transactional(readOnly = true)
    public List<JournalResponse> getJournalsByDate(Long userId, LocalDate date) {

        userLookupService.findActiveUser(userId);

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        return journalRepository
                .findByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(
                        userId,
                        start,
                        end)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JournalResponse> searchJournals(Long userId, String keyword) {

        userLookupService.findActiveUser(userId);

        return journalRepository
                .searchJournal(userId, keyword)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
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

}