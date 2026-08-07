from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
database = client[settings.MONGO_DATABASE]

test_logs = database["test_logs"]
chat_sessions = database["chat_sessions"]