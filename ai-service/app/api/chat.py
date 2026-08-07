from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
import json

from app.models.chat_models import ChatRequest
from app.models.chat_models import RuntimeContext
from app.services.agent_service import agent
from app.services.chat_summary_service import generate_summary
from app.prompts.system_prompt import SYSTEM_PROMPT
from app.services.chat_history_service import (
    append_chat,
    get_summary,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


def sse_event(event_type: str, payload: dict[str, str]) -> str:
    return f"event: {event_type}\ndata: {json.dumps(payload)}\n\n"


async def generate_stream(request: ChatRequest):

    ai_response = ""
    if request.session_id:
        conversation_summary = await get_summary(request.session_id)
    else:
        conversation_summary = []
    
    memory = "\n".join(conversation_summary)
    system_prompt = f"""{SYSTEM_PROMPT}
    Conversation Memory:
    {memory if memory else "No previous conversation."}
    """

    print("system_prompt", system_prompt)

    try:
        for message, metadata in agent.stream(
            {
                "messages": [
                    SystemMessage(content=system_prompt),
                    HumanMessage(content=request.question)
                ]
            },
            context=RuntimeContext(
                user_id=request.user_id,
            ),
            stream_mode="messages",
        ):

            if not isinstance(message, AIMessage) or not message.content:
                continue

            if isinstance(message.content, str):
                ai_response += message.content
                yield sse_event(
                    "token",
                    {
                        "content": message.content,
                    },
                )

            elif isinstance(message.content, list):
                for item in message.content:
                    if isinstance(item, dict) and "text" in item:
                        ai_response += item["text"]
                        yield sse_event(
                            "token",
                            {
                                "content": item["text"],
                            },
                        )

        summary = generate_summary(
            user_message=request.question,
            ai_message=ai_response,
        )

        print(summary)
        session_id = await append_chat(
            user_id=request.user_id,
            session_id=request.session_id,
            title=request.question[:25],   # temporary
            user_message=request.question,
            assistant_message=ai_response,
            summary=summary,
        )

        yield sse_event(
            "done",
            {
                "session_id": session_id,
            },
        )

    except Exception as exception:
        yield sse_event(
            "error",
            {
                "message": str(exception),
            },
        )


@router.post("/stream")
def stream_chat(request: ChatRequest):

    return StreamingResponse(
        generate_stream(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )