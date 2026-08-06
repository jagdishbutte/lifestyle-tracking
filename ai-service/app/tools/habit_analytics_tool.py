from datetime import date

from langchain.tools import ToolRuntime, tool
from sqlalchemy import text

from app.database.mysql import engine
from app.models.runtime_context import RuntimeContext
from app.models.tool_models import HabitAnalyticsInput


@tool(args_schema=HabitAnalyticsInput)
def habit_analytics_tool(
    runtime: ToolRuntime[RuntimeContext],
    start_date: date,
    end_date: date,
) -> dict:
    """
    Retrieves the authenticated user's habit tracking history.

    Use this tool whenever the user asks about:
    - Habits
    - Habit completion
    - Streaks
    - Consistency
    - Daily routines
    """

    user_id = runtime.context.user_id

    sql = text("""
        SELECT
            h.name,
            h.category,
            hl.completed,
            hl.log_date
        FROM habit_logs hl
        INNER JOIN habits h
            ON hl.habit_id = h.id
        WHERE h.user_id = :user_id
          AND hl.log_date BETWEEN :start_date AND :end_date
        ORDER BY hl.log_date DESC
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
        "tool": "habit_analytics",
        "entries": rows,
        "total_entries": len(rows),
        "date_range": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },
    }