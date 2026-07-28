export type MealType =
    | "BREAKFAST"
    | "LUNCH"
    | "SNACK"
    | "DINNER";

export interface FoodResponse {
    id: number;
    name: string;
    category: string;
    servingQuantity: number;
    servingUnit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

export interface MealItemRequest {
    foodId: number;
    quantity: number;
}

export interface AddMealRequest {
    userId: number;
    mealType: MealType;
    consumedDate: string;
    items: MealItemRequest[];
}

export interface DietEntryResponse {
    id: number;
    foodName: string;
    mealType: MealType;
    quantityConsumed: number;
    consumedCalories: number;
    consumedProtein: number;
    consumedCarbs: number;
    consumedFat: number;
    consumedFiber: number;
    consumedDate: string;
}

export interface MealSummary {
    mealType: MealType;
    entries: DietEntryResponse[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
    itemCount: number;
}

export interface DailyDietResponse {
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
    mealSummaries: MealSummary[];
    dailyCalorieGoal: number;
}

export interface UpdateDietEntryRequest {
    quantity: number;
}