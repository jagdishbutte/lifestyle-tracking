from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.utils.datetime_utils import now


class ChatRequest(BaseModel):
    user_id: int
    session_id: Optional[str] = None
    question: str

class ChatResponse(BaseModel):
    response: str


class RuntimeContext(BaseModel):
    user_id: int
    conversation_summary: list[str] = []

class Message(BaseModel):
    role: str
    content: str


class ChatSession(BaseModel):
    user_id: int
    session_id: str
    title: str
    summary: list[str] = Field(default_factory=list)
    messages: list[Message] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=now)
    updated_at: datetime = Field(default_factory=now)