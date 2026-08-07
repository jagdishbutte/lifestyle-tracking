from langchain.agents import create_agent

from app.services.llm_service import llm
from app.tools import (
    food_analytics_tool,
    checkin_analytics_tool,
    habit_analytics_tool,
    expense_analytics_tool,
    journal_analytics_tool,
    platform_knowledge_tool,
)

agent = create_agent(
    model=llm,
    tools=[
        food_analytics_tool, 
        checkin_analytics_tool,
        habit_analytics_tool,
        expense_analytics_tool,
        journal_analytics_tool,
        platform_knowledge_tool,
    ],
)