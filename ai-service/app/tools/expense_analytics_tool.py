from datetime import date

from langchain.tools import ToolRuntime, tool
from sqlalchemy import text

from app.database.mysql import engine
from app.models.runtime_context import RuntimeContext
from app.models.tool_models import ExpenseAnalyticsInput


@tool(args_schema=ExpenseAnalyticsInput)
def expense_analytics_tool(
    runtime: ToolRuntime[RuntimeContext],
    start_date: date,
    end_date: date,
) -> dict:
    """
    Retrieves the authenticated user's expense history.

    Use this tool whenever the user asks about:
    - Expenses
    - Spending
    - Categories
    - Monthly expenses
    - Daily expenses
    - Financial trends
    """

    user_id = runtime.context.user_id

    sql = text("""
        SELECT
            expense_name,
            amount,
            category,
            expense_date
        FROM expenses
        WHERE user_id = :user_id
          AND expense_date BETWEEN :start_date AND :end_date
        ORDER BY expense_date DESC
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
        "tool": "expense_analytics",
        "entries": rows,
        "total_entries": len(rows),
        "date_range": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },
    }