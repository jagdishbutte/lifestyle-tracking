from uuid import uuid4
from langchain_core.messages import HumanMessage, SystemMessage
import json

from app.models.insight_models import WeeklyInsightResponse
from app.prompts.insight_prompt import SYSTEM_PROMPT
from app.services.llm_service import insight_llm

from app.database.mongo import weekly_insights
from app.models.insight_models import (
    WeeklyInsightDocument,
    WeeklyInsightResponse,
)
from app.utils.datetime_utils import now


async def save_weekly_insight(
    user_id: int,
    insight: WeeklyInsightResponse,
) -> str:

    insight_id = str(uuid4())

    document = WeeklyInsightDocument(
        user_id=user_id,
        insight_id=insight_id,
        insights=insight.insights,
        recommendations=insight.recommendations,
        created_at=now(),
    )

    try:
        await weekly_insights.insert_one(
            document.model_dump()
        )
        return insight_id

    except Exception as exception:
        raise Exception(
            f"Failed to save weekly insight: {exception}"
        )


def generate_weekly_insight(
    weekly_data: dict,
) -> WeeklyInsightResponse:

    print("weekly_data: ", weekly_data)

    return insight_llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(
                content=json.dumps(
                    weekly_data,
                    indent=2,
                    default=str,
                )
            ),
        ]
    )


async def get_latest_weekly_insight(
    user_id: int,
):

    return await weekly_insights.find_one(
        {"user_id": user_id},
        sort=[("created_at", -1)],
        projection={"_id": 0},
    )