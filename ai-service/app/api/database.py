from fastapi import APIRouter

from app.services.database_service import test_connection

router = APIRouter(
    prefix="/database",
    tags=["Database"]
)

@router.get("/test")
def database_test():
    
    return {
        "server_time": test_connection()
    }