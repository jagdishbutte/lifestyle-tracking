from langchain.agents import create_agent

from app.prompts.system_prompt import SYSTEM_PROMPT
from app.services.llm_service import llm
from app.tools.food_analytics_tool import food_analytics_tool

agent = create_agent(
    model=llm,
    tools=[food_analytics_tool],
    system_prompt=SYSTEM_PROMPT,
)