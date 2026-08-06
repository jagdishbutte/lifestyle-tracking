from pydantic import BaseModel

class RuntimeContext(BaseModel):
    user_id: int