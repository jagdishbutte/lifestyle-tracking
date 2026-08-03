from pymongo import MongoClient
from app.config import settings

client = MongoClient(settings.MONGO_URI)
database = client[settings.MONGO_DATABASE]