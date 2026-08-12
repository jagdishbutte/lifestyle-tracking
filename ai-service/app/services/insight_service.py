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


from datetime import date
from uuid import uuid4

async def save_weekly_insight(
    user_id: int,
    insight: WeeklyInsightResponse,
) -> str:
    
    today_str = date.today().isoformat()
    
    new_insight_id = str(uuid4())

    query_filter = {
        "user_id": user_id,
        "insight_date": today_str
    }

    update_operation = {
        "$set": {
            "insights": insight.insights.model_dump() if hasattr(insight.insights, "model_dump") else insight.insights,
            "recommendations": insight.recommendations,
            "updated_at": now()
        },
        "$setOnInsert": {
            "insight_id": new_insight_id,
            "created_at": now()
        }
    }

    try:
        result = await weekly_insights.update_one(
            query_filter,
            update_operation,
            upsert=True  
        )

        if result.upserted_id is None:
            existing_doc = await weekly_insights.find_one(query_filter, {"insight_id": 1})
            return existing_doc["insight_id"]
        
        return new_insight_id

    except Exception as exception:
        raise Exception(
            f"Failed to save or update weekly insight: {exception}"
        )


def generate_weekly_insight(
    weekly_data: dict,
) -> WeeklyInsightResponse:

    # print("weekly_data: ", weekly_data)

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
        sort=[("insight_date", -1), ("created_at", -1)],
        projection={"_id": 0},
    )