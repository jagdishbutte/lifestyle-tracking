from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):

    APP_NAME: str
    APP_VERSION: str

    MYSQL_HOST: str
    MYSQL_PORT: int
    MYSQL_DATABASE: str
    MYSQL_USERNAME: str
    MYSQL_PASSWORD: str

    MONGO_URI: str
    MONGO_DATABASE: str

    GEMINI_API_KEY: str
    GROQ_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True
    )

settings = Settings()