from fastapi import APIRouter

from app.database.mongo import test_logs
from app.services.database_service import test_connection
from app.services.llm_service import llm_with_tools
from app.tools.food_analytics_tool import food_analytics_tool

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

    test_logs.insert_one({
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