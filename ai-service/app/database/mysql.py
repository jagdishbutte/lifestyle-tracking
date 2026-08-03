from sqlalchemy import create_engine
from sqlalchemy.engine import Engine

from app.config import settings

DATABASE_URL = (
    f"mysql+pymysql://"
    f"{settings.MYSQL_USERNAME}:"
    f"{settings.MYSQL_PASSWORD}@"
    f"{settings.MYSQL_HOST}:"
    f"{settings.MYSQL_PORT}/"
    f"{settings.MYSQL_DATABASE}"
)

# print(DATABASE_URL)

engine: Engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
)