package com.lifestyleai.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    @ResponseStatus(HttpStatus.CREATED)
    public JournalResponse addJournal(
            @Valid @RequestBody JournalRequest request) {

        return journalService.addJournal(request);
    }

    /**
     * Method   : GET
     * API      : /api/journals/{id}
     * Function : Returns journal details by ID.
     */
    @GetMapping("/{id}")
    public JournalResponse getJournalById(
            @PathVariable Long id) {

        return journalService.getJournalById(id);
    }

    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}
     * Function : Returns all journals of a user.
     */
    @GetMapping("/user/{userId}")
    public List<JournalResponse> getAllJournals(
            @PathVariable Long userId) {

        return journalService.getAllJournals(userId);
    }

    /**
     * Method   : PUT
     * API      : /api/journals/{id}
     * Function : Updates a journal entry.
     */
    @PutMapping("/{id}")
    public JournalResponse updateJournal(
            @PathVariable Long id,
            @Valid @RequestBody JournalRequest request) {

        return journalService.updateJournal(id, request);
    }

    /**
     * Method   : DELETE
     * API      : /api/journals/{id}
     * Function : Deletes a journal entry.
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJournal(
            @PathVariable Long id) {

        journalService.deleteJournal(id);
    }

    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}/date/{date}
     * Function : Returns all journals for a specific date.
     */
    @GetMapping("/user/{userId}/date/{date}")
    public List<JournalResponse> getJournalsByDate(
            @PathVariable Long userId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return journalService.getJournalsByDate(userId, date);
    }

    /**
     * Method   : GET
     * API      : /api/journals/user/{userId}/search
     * Function : Searches journals by title or content.
     */
    @GetMapping("/user/{userId}/search")
    public List<JournalResponse> searchJournals(
            @PathVariable Long userId,
            @RequestParam String keyword) {

        return journalService.searchJournals(userId, keyword);
    }

}