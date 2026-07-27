package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.journal.JournalRequest;
import com.lifestyleai.dto.journal.JournalResponse;
import com.lifestyleai.service.JournalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/journals")
@RequiredArgsConstructor
@Validated
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
     * Method   : GET
     * API      : /api/journals/{id}
     * Function : Returns journal details by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JournalResponse>> getJournalById(
            @PathVariable Long id) {

        JournalResponse response = journalService.getJournalById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journal fetched successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}
     * Function : Returns all journals of a user.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<JournalResponse>>> getAllJournals(
            @PathVariable Long userId) {

        List<JournalResponse> response = journalService.getAllJournals(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journals fetched successfully.",
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
     * API      : /api/journals/user/{userId}/date/{date}
     * Function : Returns all journals for a specific date.
     */
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<ApiResponse<List<JournalResponse>>> getJournalsByDate(
            @PathVariable Long userId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        List<JournalResponse> response =
                journalService.getJournalsByDate(userId, date);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Journals fetched successfully.",
                        response));
    }

    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}/search
     * Function : Searches journals by title or content.
     */
    @GetMapping("/user/{userId}/search")
    public ResponseEntity<ApiResponse<List<JournalResponse>>> searchJournals(
            @PathVariable Long userId,
            @RequestParam String keyword) {

        List<JournalResponse> response =
                journalService.searchJournals(userId, keyword);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Search completed successfully.",
                        response));
    }

}