from datetime import date
from typing import Optional
from pydantic import BaseModel

class DateRangeInput(BaseModel):
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class FoodAnalyticsInput(DateRangeInput):
    pass

class HabitAnalyticsInput(DateRangeInput):
    pass

class ExpenseAnalyticsInput(DateRangeInput):
    pass

class CheckinAnalyticsInput(DateRangeInput):
    pass

class JournalAnalyticsInput(DateRangeInput):
    pass