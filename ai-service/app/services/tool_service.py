from langchain.tools import tool

@tool
def user_food_retriever(
    user_id: int,
    question: str,
    start_date: str | None = None,
    end_date: str | None = None,
):
    """
    Retrieves food information of the current user.
    Use this whenever the question is related to meals,
    calories, nutrition or food history.
    """