from fastapi import FastAPI
from app.api.test import router as test_router
from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(test_router)

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