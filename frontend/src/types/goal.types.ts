export interface Goal {
    id: number;
    title: string;
    category:
        | "Fitness"
        | "Finance"
        | "Learning"
        | "Personal";

    targetValue: number;
    currentValue: number;

    unit: string;

    targetDate: string;
}