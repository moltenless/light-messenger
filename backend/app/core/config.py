from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALG: str = "HS256"    # personally I prefer leave configuration without default values 
    ACCESS_TTL_MIN: int = 45  # to ensure env variables reachability
    REFRESH_TTL_DAYS: int = 7
    BACKEND_CORS_ORIGINS: str = "http://localhost:5173"

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.BACKEND_CORS_ORIGINS.split(",") if o.strip()]
    
settings = Settings()