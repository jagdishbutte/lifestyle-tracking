from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import settings
from app.services.tool_service import user_food_retriever

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=settings.GEMINI_API_KEY,
)

llm_with_tools = llm.bind_tools([
    user_food_retriever
])