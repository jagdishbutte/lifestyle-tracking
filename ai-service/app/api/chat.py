from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.messages import AIMessage, HumanMessage
import json

from app.models.chat_models import ChatRequest
from app.models.runtime_context import RuntimeContext
from app.services.agent_service import agent

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


def sse_event(event_type: str, payload: dict[str, str]) -> str:
    return f"event: {event_type}\ndata: {json.dumps(payload)}\n\n"


def generate_stream(request: ChatRequest):
    try:
        for message, metadata in agent.stream(
            {
                "messages": [
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
                yield sse_event(
                    "token",
                    {
                        "content": message.content,
                    },
                )

            elif isinstance(message.content, list):
                for item in message.content:
                    if isinstance(item, dict) and "text" in item:
                        yield sse_event(
                            "token",
                            {
                                "content": item["text"],
                            },
                        )

        yield sse_event("done", {})

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