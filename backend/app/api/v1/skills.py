from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.services.skills_service import SkillsService
from app.schemas.skills import Skill

router = APIRouter(prefix="/skills", tags=["skills"])
service = SkillsService()

@router.get("", response_model=list[str], summary="List skills")
def list_skills(db: Session = Depends(get_db)):
    return service.list_skills(db)

@router.post("", response_model=str, status_code=status.HTTP_201_CREATED, summary="Create skill")
def create_skill(payload: Skill, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    return service.create_skill(db, payload)

@router.delete("/{skill_name}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete skill")
def delete_skill(skill_name: str, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    success = service.delete_skill(db, skill_name)
    if not success:
        raise HTTPException(status_code=404, detail="Skill not found")
    return None
