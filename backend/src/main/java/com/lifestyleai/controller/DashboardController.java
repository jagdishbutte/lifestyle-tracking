package com.lifestyleai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lifestyleai.dto.dashboard.DashboardSummaryResponse;
import com.lifestyleai.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Method   : GET
     * API      : /api/dashboard/summary/{userId}
     * Function : Returns dashboard summary cards.
     */
    @GetMapping("/summary/{userId}")
    public DashboardSummaryResponse getDashboardSummary(
            @PathVariable Long userId) {

        return dashboardService.getDashboardSummary(userId);
    }

}