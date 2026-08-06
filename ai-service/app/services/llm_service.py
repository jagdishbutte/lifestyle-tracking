# from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

from app.config import settings
from app.tools.food_analytics_tool import food_analytics_tool

# llm = ChatGoogleGenerativeAI(
#     model="gemini-3.6-flash",
#     google_api_key=settings.GEMINI_API_KEY,
# )
# llama-3.1-8b-instant

llm = ChatGroq(
    # model="llama-3.1-8b-instant",
    model="openai/gpt-oss-120b",
    temperature= 0.4,
    api_key=settings.GROQ_API_KEY
)

llm_with_tools = llm.bind_tools([
    food_analytics_tool
])