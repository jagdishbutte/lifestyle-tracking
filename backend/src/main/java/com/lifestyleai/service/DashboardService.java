package com.lifestyleai.service;

import com.lifestyleai.dto.dashboard.DashboardSummaryResponse;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary(Long userId);

}