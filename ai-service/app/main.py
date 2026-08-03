from fastapi import FastAPI
from app.api.database import router as database_router
from app.api.mongo import router as mongo_router
from app.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(database_router)
app.include_router(mongo_router)

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