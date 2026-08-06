from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_id: int
    question: str

class ChatResponse(BaseModel):
    response: str