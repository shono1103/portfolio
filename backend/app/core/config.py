from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

class Settings(BaseModel):
    app_name: str = "Portfolio API"
    version: str = "0.2.0"
    cors_allow_origins: list[str] = ["*"]   # 本番はオリジンを絞る
    cors_allow_methods: list[str] = ["GET"]
    cors_allow_headers: list[str] = ["*"]
    cors_allow_credentials: bool = True

settings = Settings()

def apply_cors(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allow_origins,
        allow_credentials=settings.cors_allow_credentials,
        allow_methods=settings.cors_allow_methods,
        allow_headers=settings.cors_allow_headers,
    )
