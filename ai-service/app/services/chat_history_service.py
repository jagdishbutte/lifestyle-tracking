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
    user_id: int,
    session_id: str,
) -> dict | None:

    return await chat_sessions.find_one(
        {
            "user_id": user_id,
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


async def get_history(
    user_id: int,
):

    sessions = await chat_sessions.find(
        {
            "user_id": user_id,
        },
        {
            "_id": 0,
            "session_id": 1,
            "title": 1,
        },
    ).sort(
        "updated_at",
        -1,
    ).to_list(None)

    return {
        "sessions": sessions,
    }


async def delete_history(
    user_id: int,
    session_id: str,
):

    await chat_sessions.delete_one(
        {
            "user_id": user_id,
            "session_id": session_id,
        }
    )


async def update_title(
    user_id: int,
    session_id: str,
    title: str,
):

    await chat_sessions.update_one(
        {
            "user_id": user_id,
            "session_id": session_id,
        },
        {
            "$set": {
                "title": title,
                "updated_at": now(),
            }
        },
    )