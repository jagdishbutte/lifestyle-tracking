from fastapi import FastAPI

from app.api.test import router as test_router
from app.api.chat import router as chat_router
from app.api.insights import router as insights_router
from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(test_router)
app.include_router(chat_router)
app.include_router(insights_router)

@app.get("/")
def home():
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }