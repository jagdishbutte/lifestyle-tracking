from fastapi import APIRouter
from app.models.runtime_context import RuntimeContext

from app.database.collections import dashboard_summaries
from app.services.database_service import test_connection
from app.services.llm_service import llm_with_tools
from app.tools.food_analytics_tool import food_analytics_tool
from app.services.agent_service import agent

router = APIRouter(
    prefix="/test",
    tags=["Database"]
)

@router.get("/mysql")
def database_test():
    
    return {
        "server_time": test_connection()
    }

@router.get("/mongo")
def mongo_test():

    dashboard_summaries.insert_one({
        "test": "working"
    })

    return {"status": "success"}

@router.get("/llm")
def test():

    response = llm_with_tools.invoke(
        "What was my most frequent food last month?"
    )

    return {
        "content": response.content,
        "tool_calls": response.tool_calls
    }