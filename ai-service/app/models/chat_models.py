from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from typing import Generic, TypeVar

from app.utils.datetime_utils import now

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: T | None = None

class ChatRequest(BaseModel):
    user_id: int
    session_id: Optional[str] = None
    question: str

class ChatResponse(BaseModel):
    response: str

class UpdateTitleRequest(BaseModel):
    title: str

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