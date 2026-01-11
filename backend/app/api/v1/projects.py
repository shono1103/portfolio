from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.services.projects_service import ProjectsService
from app.schemas.projects import Project, ProjectCreate

router = APIRouter(prefix="/projects", tags=["projects"])
service = ProjectsService()

@router.get("", response_model=list[Project], summary="List projects")
def list_projects(db: Session = Depends(get_db)):
    return service.list_projects(db)

@router.post("", response_model=Project, status_code=status.HTTP_201_CREATED, summary="Create project")
def create_project(payload: ProjectCreate, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    return service.create_project(db, payload)

@router.get("/{project_id}", response_model=Project, summary="Get project by ID")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = service.get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=Project, summary="Update project")
def update_project(project_id: int, payload: ProjectCreate, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    project = service.update_project(db, project_id, payload)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete project")
def delete_project(project_id: int, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    success = service.delete_project(db, project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return None
