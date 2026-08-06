from datetime import date
from typing import Optional
from pydantic import BaseModel
from app.models.enums import TimeRange, ToolName

class DateFilter(BaseModel):
    preset: Optional[TimeRange] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class ToolCall(BaseModel):
    tool_name: ToolName
    date_filter: DateFilter

class ExecutionPlan(BaseModel):
    tools: list[ToolCall]