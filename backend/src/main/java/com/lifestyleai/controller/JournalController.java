package com.lifestyleai.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.journal.DailyJournalResponse;
import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;
import com.lifestyleai.service.JournalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/journals")
@RequiredArgsConstructor
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class JournalController {

    private final JournalService journalService;

    /**
     * Method   : POST
     * API      : /api/journals
     * Function : Creates a new journal entry.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<JournalResponse>> addJournal(
            @Valid @RequestBody JournalRequest request) {

        JournalResponse response = journalService.addJournal(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Journal created successfully.",
                        response));
    }

    
    /**
     * Method   : PUT
     * API      : /api/journals/{id}
     * Function : Updates a journal entry.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JournalResponse>> updateJournal(
            @PathVariable Long id,
            @Valid @RequestBody JournalRequest request) {

        JournalResponse response = journalService.updateJournal(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journal updated successfully.",
                        response));
    }

    /**
     * Method   : DELETE
     * API      : /api/journals/{id}
     * Function : Deletes a journal entry.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJournal(
            @PathVariable Long id) {

        journalService.deleteJournal(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journal deleted successfully.",
                        null));
    }
    
    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}/today
     * Function : Returns today's journal entries.
     */
    @GetMapping("/user/{userId}/today")
    public ResponseEntity<ApiResponse<DailyJournalResponse>> getTodayJournals(
            @PathVariable Long userId) {

        DailyJournalResponse response =
                journalService.getTodayJournals(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Today's journals retrieved successfully.",
                        response));
    }
    
    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}/history?days=7
     * Function : Returns journal history for the last N days.
     */
    @GetMapping("/user/{userId}/history")
    public ResponseEntity<ApiResponse<List<DailyJournalResponse>>> getJournalHistory(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "7") Integer days) {

        List<DailyJournalResponse> response =
                journalService.getJournalHistory(
                        userId,
                        days);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journal history retrieved successfully.",
                        response));
    }
}