from datetime import date, timedelta
from fastapi import APIRouter

from app.models.insight_models import InsightsRequest
from app.models.chat_models import ApiResponse
from app.services.insight_service import generate_weekly_insight
from app.services.insight_service import save_weekly_insight
from app.tools.weekly_insights_tool import weekly_insights_tool
from app.services.insight_service import (
    get_latest_weekly_insight,
)


router = APIRouter(
    prefix="/insights",
    tags=["Insights"],
)


@router.post("/generate")
async def generate_insight(request: InsightsRequest):

    try:

        end_date = date.today()
        start_date = end_date - timedelta(days=6)

        weekly_data = weekly_insights_tool(
            user_id=request.user_id,
            start_date=start_date,
            end_date=end_date,
        )

        insight = generate_weekly_insight(weekly_data)

        insight_id = await save_weekly_insight(
            user_id=request.user_id,
            insight=insight,
        )

        return ApiResponse(
            success=True,
            message="Weekly insight generated successfully.",
            data=insight_id,
        )

    except Exception as exception:

        return ApiResponse(
            success=False,
            message=str(exception),
            data=None,
        )


@router.post("/latest")
async def latest_insight(request: InsightsRequest):

    insight = await get_latest_weekly_insight(
        request.user_id,
    )

    if insight is None:
        return ApiResponse(
            success=False,
            message="No weekly insights found.",
            data=None,
        )

    return ApiResponse(
        success=True,
        message="Latest weekly insight retrieved successfully.",
        data=insight,
    )