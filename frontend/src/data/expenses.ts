import { type Expense } from "../types/expense";

export const initialExpenses: Expense[] = [
    {
        id: 1,
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-06-06",
    },

    {
        id: 2,
        title: "Bus Ticket",
        amount: 50,
        category: "Travel",
        date: "2026-06-06",
    },

    {
        id: 3,
        title: "Java Book",
        amount: 500,
        category: "Education",
        date: "2026-06-05",
    },
];

export const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Education",
    "Health",
    "Entertainment",
    "Other",
];