from fastapi import APIRouter
from app.database.collections import dashboard_summaries
router = APIRouter(prefix="/mongo", tags=["Mongo"])


@router.get("/test")
def mongo_test():

    dashboard_summaries.insert_one({
        "test": "working"
    })

    return {"status": "success"}