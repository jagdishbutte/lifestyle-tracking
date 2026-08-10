from datetime import date

from langchain.tools import ToolRuntime, tool
from sqlalchemy import text

from app.database.mysql import engine
from app.models.chat_models import RuntimeContext
# from app.models.tool_models import WeeklyInsightInput


def weekly_insights_tool(
    user_id: int,
    start_date: date,
    end_date: date,
) -> dict:
    """
    Retrieves an AI-ready summary of the authenticated user's
    last week's lifestyle data.

    This tool aggregates:

    - Daily Check-ins
    - Habits
    - Diet
    - Expenses
    - Journals

    Use ONLY for weekly insight generation.
    """

    with engine.connect() as connection:

        # =====================================================
        # CHECKINS
        # =====================================================

        checkin_sql = text("""
            SELECT
                COUNT(*)                                    AS total_checkins,
                AVG(sleep_hours)                            AS avg_sleep,
                AVG(water_glasses)                          AS avg_water,
                AVG(steps_walked)                           AS avg_steps,
                AVG(wellbeing_score)                        AS avg_wellbeing,
                MIN(sleep_hours)                            AS min_sleep,
                MAX(sleep_hours)                            AS max_sleep,
                MIN(steps_walked)                           AS min_steps,
                MAX(steps_walked)                           AS max_steps
            FROM daily_check_ins
            WHERE user_id = :user_id
            AND DATE(created_at) BETWEEN :start_date AND :end_date
        """)

        checkins = dict(
            connection.execute(
                checkin_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings().first()
        )

        # =====================================================
        # HABITS
        # =====================================================

        habits_sql = text("""
            SELECT
                COUNT(*) AS total_logs,
                SUM(CASE WHEN hl.completed = true THEN 1 ELSE 0 END) AS completed,
                SUM(CASE WHEN hl.completed = false THEN 1 ELSE 0 END) AS missed
            FROM habit_logs hl
            JOIN habits h ON h.id = hl.habit_id
            WHERE h.user_id = :user_id
            AND hl.log_date BETWEEN :start_date AND :end_date
        """)

        habits = dict(
            connection.execute(
                habits_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings().first()
        )

        # =====================================================
        # DIET
        # =====================================================

        diet_sql = text("""
            SELECT
                COUNT(*) AS meal_entries,
                SUM(consumed_calories) AS total_calories,
                AVG(consumed_calories) AS avg_calories
            FROM diet_entries
            WHERE user_id = :user_id
            AND DATE(created_at) BETWEEN :start_date AND :end_date
        """)

        diet = dict(
            connection.execute(
                diet_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings().first()
        )

        meal_breakdown_sql = text("""
            SELECT
                meal_type,
                COUNT(*) AS entries,
                SUM(consumed_calories) AS calories
            FROM diet_entries
            WHERE user_id = :user_id
            AND DATE(created_at) BETWEEN :start_date AND :end_date
            GROUP BY meal_type
        """)

        meal_breakdown = [
            dict(row)
            for row in connection.execute(
                meal_breakdown_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings()
        ]

        # =====================================================
        # EXPENSES
        # =====================================================

        expense_sql = text("""
            SELECT
                COUNT(*) AS total_transactions,
                SUM(amount) AS total_amount,
                AVG(amount) AS average_transaction,
                MAX(amount) AS highest_transaction
            FROM expenses
            WHERE user_id = :user_id
            AND expense_date BETWEEN :start_date AND :end_date
        """)

        expenses = dict(
            connection.execute(
                expense_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings().first()
        )

        expense_categories_sql = text("""
            SELECT
                category,
                COUNT(*) AS transactions,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = :user_id
            AND expense_date BETWEEN :start_date AND :end_date
            GROUP BY category
            ORDER BY total DESC
        """)

        expense_categories = [
            dict(row)
            for row in connection.execute(
                expense_categories_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings()
        ]

        # =====================================================
        # JOURNAL
        # =====================================================

        journal_sql = text("""
            SELECT
                COUNT(*) AS total_entries
            FROM journals
            WHERE user_id = :user_id
            AND DATE(created_at) BETWEEN :start_date AND :end_date
        """)

        journal_stats = dict(
            connection.execute(
                journal_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings().first()
        )

        journal_preview_sql = text("""
            SELECT
                title,
                LEFT(content,300) AS content
            FROM journals
            WHERE user_id = :user_id
            AND DATE(created_at) BETWEEN :start_date AND :end_date
            ORDER BY created_at DESC
            LIMIT 3
        """)

        journal_preview = [
            dict(row)
            for row in connection.execute(
                journal_preview_sql,
                {
                    "user_id": user_id,
                    "start_date": start_date,
                    "end_date": end_date,
                },
            ).mappings()
        ]

    return {

        "period": {
            "start_date": str(start_date),
            "end_date": str(end_date),
        },

        "checkins": checkins,

        "habits": {
            **habits,
            "completion_rate":
                round(
                    habits["completed"] * 100 / habits["total_logs"],
                    2
                ) if habits["total_logs"] else 0
        },

        "diet": {
            **diet,
            "meal_breakdown": meal_breakdown,
        },

        "expenses": {
            **expenses,
            "categories": expense_categories,
        },

        "journals": {
            **journal_stats,
            "sample_entries": journal_preview,
        },
    }