# app/main.py の起動時に一度だけテーブル作成したい場合
import os
from fastapi import FastAPI
from app.core.config import settings, apply_cors
from app.api.v1.router import api_v1
from app.db.base import engine, Base, SessionLocal
from app.db.models import SkillModel, ProjectModel, JobExperienceModel, UserModel
from app.services.auth_service import create_user
from scripts.seed import run as seed_run

app = FastAPI(title=settings.app_name, version=settings.version)
apply_cors(app)

# ★開発用：最初の一回だけでもOK（本番はAlembic推奨）
Base.metadata.create_all(bind=engine)
db = SessionLocal()
try:
    has_data = (
        db.query(SkillModel.id).first()
        or db.query(ProjectModel.id).first()
        or db.query(JobExperienceModel.id).first()
    )
    if not has_data:
        seed_run()
    
    # Create default admin user if not exists
    admin_username = os.getenv("ADMIN_USERNAME", "admin")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    existing_admin = db.query(UserModel).filter(UserModel.username == admin_username).first()
    if not existing_admin:
        create_user(db, admin_username, admin_password)
        print(f"Created admin user: {admin_username}")
finally:
    db.close()

app.include_router(api_v1)

@app.get("/", tags=["health"])
def health():
    return {"ok": True, "app": settings.app_name, "version": settings.version}
