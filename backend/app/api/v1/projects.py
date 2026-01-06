from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.projects_service import ProjectsService
from app.schemas.projects import Project, ProjectCreate

router = APIRouter(prefix="/projects", tags=["projects"])
service = ProjectsService()

@router.get("", response_model=list[Project], summary="List projects")
def list_projects(db: Session = Depends(get_db)):
    return service.list_projects(db)

@router.post("", response_model=Project, status_code=status.HTTP_201_CREATED, summary="Create project")
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    return service.create_project(db, payload)
