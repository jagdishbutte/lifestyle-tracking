from datetime import date

from langchain.tools import ToolRuntime, tool
from sqlalchemy import text

from app.database.mysql import engine
from app.models.runtime_context import RuntimeContext
from app.models.tool_models import CheckinAnalyticsInput

@tool(args_schema=CheckinAnalyticsInput)
def checkin_analytics_tool(
    start_date: date,
    end_date: date,
    runtime: ToolRuntime[RuntimeContext],
) -> dict:
    """
    Retrieves the authenticated user's daily check-in records.

    Use this tool whenever the user asks about:
    - Sleep
    - Water intake
    - Steps
    - Mood
    - Daily check-ins
    - Wellness trends
    """

    user_id = runtime.context.user_id
    # print("checkin tool called")

    sql = text("""
        SELECT
            sleep_hours,
            water_glasses,
            steps_walked,
            wellbeing_score,
            created_at
        FROM daily_check_ins
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
        "tool": "checkin_analytics",
        "entries": rows,
        "total_entries": len(rows),
        "date_range": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },
    }