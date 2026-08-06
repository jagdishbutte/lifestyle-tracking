from enum import Enum

class TimeRange(str, Enum):
    TODAY = "today"
    LAST_7_DAYS = "last_7_days"
    LAST_30_DAYS = "last_30_days"
    CURRENT_MONTH = "current_month"
    PREVIOUS_MONTH = "previous_month"
    CUSTOM = "custom"

class ToolName(str, Enum):
    USER_CHECKIN_RETRIEVER = "user_checkin_retriever"
    USER_HABIT_RETRIEVER = "user_habit_retriever"
    USER_FOOD_RETRIEVER = "user_food_retriever"
    USER_EXPENSE_RETRIEVER = "user_expense_retriever"
    USER_JOURNAL_RETRIEVER = "user_journal_retriever"
    PLATFORM_KNOWLEDGE_RETRIEVER = "platform_knowledge_retriever"