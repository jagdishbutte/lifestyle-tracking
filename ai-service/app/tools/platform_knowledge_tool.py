from langchain.tools import tool
from pathlib import Path

@tool
def platform_knowledge_tool(question: str) -> dict:
    """
    Retrieves information about the Lifestyle Intelligence Platform.

    Use this tool whenever the user asks about:
    - Platform features
    - How to use the platform
    - Available modules
    - AI capabilities
    - FAQs
    - Navigation
    """

    knowledge_path = Path("app/context/platform_knowledge.txt")

    with open(knowledge_path, "r", encoding="utf-8") as file:
        content = file.read()

    return {
        "tool": "platform_knowledge",
        "question": question,
        "content": content,
    }