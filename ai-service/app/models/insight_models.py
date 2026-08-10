from datetime import datetime
from pydantic import BaseModel, Field

from app.utils.datetime_utils import now


class InsightSections(BaseModel):
    checkins: str
    habits: str
    diet: str
    expenses: str
    journal: str


class WeeklyInsightResponse(BaseModel):
    insights: InsightSections
    recommendations: list[str] = Field(
        min_length=3,
        max_length=3,
        description="Three personalized lifestyle recommendations."
    )


class WeeklyInsightDocument(BaseModel):
    user_id: int
    insight_id: str
    insights: InsightSections
    recommendations: list[str]
    created_at: datetime = Field(default_factory=now)
    

class InsightsRequest(BaseModel):
    user_id: int