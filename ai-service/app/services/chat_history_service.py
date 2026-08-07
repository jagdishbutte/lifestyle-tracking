from app.database.mongo import chat_sessions
from uuid import uuid4
from app.models.chat_models import ChatSession, Message
from app.utils.datetime_utils import now


async def create_session(
    user_id: int,
    session_id: str,
    title: str,
) -> ChatSession:

    session = ChatSession(
        user_id=user_id,
        session_id=session_id,
        title=title,
    )

    await chat_sessions.insert_one(
        session.model_dump()
    )

    return session


async def append_chat(
    user_id: int,
    session_id: str,
    title: str,
    user_message: str,
    assistant_message: str,
    summary: str,
) -> str:

    if not session_id:
        session_id = str(uuid4())
        
    await chat_sessions.update_one(
    {
        "session_id": session_id,
    },
    {
        "$setOnInsert": {
            "user_id": user_id,
            "session_id": session_id,
            "title": title,
            "created_at": now(),
        },
        "$push": {
            "messages": {
                "$each": [
                    Message(
                        role="user",
                        content=user_message,
                    ).model_dump(),
                    Message(
                        role="assistant",
                        content=assistant_message,
                    ).model_dump(),
                ]
            },
            "summary": summary,
        },
        "$set": {
            "updated_at": now(),
        },
    },
        upsert=True,
    )

    return session_id


async def get_session(
    session_id: str,
) -> dict | None:

    return await chat_sessions.find_one(
        {
            "session_id": session_id,
        }
    )


async def get_summary(
    session_id: str,
) -> list[str]:

    if not session_id:
        return []

    session = await chat_sessions.find_one(
        {
            "session_id": session_id,
        },
        {
            "summary": 1,
            "_id": 0,
        },
    )

    if session is None:
        return []

    return session.get("summary", [])