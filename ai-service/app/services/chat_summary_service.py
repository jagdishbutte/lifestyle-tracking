from langchain_core.messages import HumanMessage
from app.services.llm_service import summarizer_llm

def generate_summary(user_message: str, ai_message: str) -> str:

    prompt = f"""
        Generate a very short memory sentence.

        Rules:
        - Maximum 12 words.
        - Summarize only this conversation.
        - Return plain text only.

        User:
        {user_message}

        Assistant:
        {ai_message}
        """

    response = summarizer_llm.invoke(
        [HumanMessage(content=prompt)]
    )

    return response.content.strip()