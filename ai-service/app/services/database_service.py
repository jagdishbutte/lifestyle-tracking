from sqlalchemy import text
from app.database.mysql import engine

def test_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT NOW()"))
        return result.scalar()