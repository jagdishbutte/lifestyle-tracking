package com.lifestyleai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifestyleai.dto.common.ApiResponse;
import com.lifestyleai.dto.dashboard.DashboardSummaryResponse;
import com.lifestyleai.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Method   : GET
     * API      : /api/dashboard/summary
     * Function : Returns dashboard summary cards.
     */
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getDashboardSummary() {

        DashboardSummaryResponse response = dashboardService.getDashboardSummary();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Dashboard summary fetched successfully.",
                        response));
    }

}