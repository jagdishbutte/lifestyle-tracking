package com.lifestyleai.service;

import com.lifestyleai.dto.checkin.DailyCheckInRequest;
import com.lifestyleai.dto.checkin.DailyCheckInResponse;

public interface DailyCheckInService {

    DailyCheckInResponse saveTodayCheckIn(DailyCheckInRequest request);

    DailyCheckInResponse getTodayCheckIn();

}