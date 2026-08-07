from datetime import date

from langchain.tools import ToolRuntime, tool
from sqlalchemy import text

from app.database.mysql import engine
from app.models.chat_models import RuntimeContext
from app.models.tool_models import JournalAnalyticsInput


@tool(args_schema=JournalAnalyticsInput)
def journal_analytics_tool(
    runtime: ToolRuntime[RuntimeContext],
    start_date: date,
    end_date: date,
) -> dict:
    """
    Retrieves the authenticated user's journal entries.

    Use this tool whenever the user asks about:
    - Journal entries
    - Reflections
    - Thoughts
    - Feelings
    - Past writings
    - Personal notes
    """

    user_id = runtime.context.user_id

    sql = text("""
        SELECT
            title,
            content,
            created_at
        FROM journals
        WHERE user_id = :user_id
          AND DATE(created_at) BETWEEN :start_date AND :end_date
        ORDER BY created_at DESC
    """)

    with engine.connect() as connection:

        result = connection.execute(
            sql,
            {
                "user_id": user_id,
                "start_date": start_date,
                "end_date": end_date,
            },
        )

        rows = [dict(row._mapping) for row in result]

    return {
        "tool": "journal_analytics",
        "entries": rows,
        "total_entries": len(rows),
        "date_range": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },
    }