from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.skills_service import SkillsService
from app.schemas.skills import Skill

router = APIRouter(prefix="/skills", tags=["skills"])
service = SkillsService()

@router.get("", response_model=list[str], summary="List skills")
def list_skills(db: Session = Depends(get_db)):
    return service.list_skills(db)

@router.post("", response_model=str, status_code=status.HTTP_201_CREATED, summary="Create skill")
def create_skill(payload: Skill, db: Session = Depends(get_db)):
    return service.create_skill(db, payload)
