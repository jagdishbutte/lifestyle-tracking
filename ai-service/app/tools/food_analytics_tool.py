from langchain.tools import tool
from datetime import date
from sqlalchemy import text
from langchain.tools import tool, ToolRuntime

from app.database.mysql import engine
from app.models.tool_models import FoodAnalyticsInput
from app.models.runtime_context import RuntimeContext

@tool(args_schema=FoodAnalyticsInput)
def food_analytics_tool(
    runtime: ToolRuntime[RuntimeContext],
    start_date: date,
    end_date: date, 
) -> dict:
    """
    Retrieves food information of the current user.
    Use this whenever the question is related to meals,
    calories, nutrition or food history.
    """

    user_id = runtime.context.user_id

    sql = text("""
    SELECT
        f.name,
        d.meal_type,
        d.quantity_consumed,
        d.consumed_calories,
        d.created_at AS consumed_date
        FROM diet_entries AS d
        LEFT JOIN foods AS f
        ON d.food_id = f.id
        WHERE d.user_id = :user_id
        AND DATE(d.created_at) BETWEEN :start_date AND :end_date
        ORDER BY d.created_at DESC
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
        "entries": rows,
        "total_entries": len(rows),
        "start_date": start_date,
        "end_date": end_date,
    }