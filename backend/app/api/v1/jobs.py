from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.jobs_service import JobsService
from app.schemas.jobs import JobExperience, JobExperienceCreate

router = APIRouter(prefix="/jobs", tags=["jobs"])
service = JobsService()

@router.get("", response_model=list[JobExperience], summary="List job experience")
def list_jobs(db: Session = Depends(get_db)):
    return service.list_jobs(db)

@router.post("", response_model=JobExperience, status_code=status.HTTP_201_CREATED, summary="Create job experience")
def create_job(payload: JobExperienceCreate, db: Session = Depends(get_db)):
    return service.create_job(db, payload)
