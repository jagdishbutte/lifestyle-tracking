import { apiConnector } from "../api/apiConnector";
import { DIET_API, FOOD_API } from "../api/apiEndpoints";

import type { ApiResponse } from "../types/common";
import type { AddMealRequest, DailyDietResponse, DietEntryResponse, FoodResponse, UpdateDietEntryRequest } from "../types/diet";

export const searchFoods = async (
    keyword: string
): Promise<ApiResponse<FoodResponse[]>> => {

    const response = await apiConnector<ApiResponse<FoodResponse[]>>(
        "GET",
        FOOD_API.SEARCH,
        null,
        {
            keyword,
        },
        undefined,
    );

    return response.data;
};

export const addMeal = async (
    request: AddMealRequest
): Promise<ApiResponse<DailyDietResponse>> => {

    const response = await apiConnector<ApiResponse<DailyDietResponse>>(
        "POST",
        DIET_API.BASE,
        request
    );

    return response.data;
};

export const getTodayDiet = async (
    userId: number
): Promise<ApiResponse<DailyDietResponse>> => {

    const response = await apiConnector<ApiResponse<DailyDietResponse>>(
        "GET",
        `${DIET_API.TODAY}/${userId}/today`
    );

    return response.data;
};

export const updateDietEntry = async (
    dietEntryId: number,
    request: UpdateDietEntryRequest
): Promise<ApiResponse<DietEntryResponse>> => {

    const response =
        await apiConnector<ApiResponse<DietEntryResponse>>(
            "PUT",
            `${DIET_API.ENTRY}/${dietEntryId}`,
            request
        );

    return response.data;
};

export const deleteDietEntry = async (
    dietEntryId: number
): Promise<ApiResponse<void>> => {

    const response = await apiConnector<ApiResponse<void>>(
        "DELETE",
        `${DIET_API.ENTRY}/${dietEntryId}`
    );

    return response.data;
};