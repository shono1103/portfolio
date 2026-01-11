from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.services.jobs_service import JobsService
from app.schemas.jobs import JobExperience, JobExperienceCreate

router = APIRouter(prefix="/jobs", tags=["jobs"])
service = JobsService()

@router.get("", response_model=list[JobExperience], summary="List job experience")
def list_jobs(db: Session = Depends(get_db)):
    return service.list_jobs(db)

@router.post("", response_model=JobExperience, status_code=status.HTTP_201_CREATED, summary="Create job experience")
def create_job(payload: JobExperienceCreate, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    return service.create_job(db, payload)

@router.get("/{job_id}", response_model=JobExperience, summary="Get job experience by ID")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = service.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=JobExperience, summary="Update job experience")
def update_job(job_id: int, payload: JobExperienceCreate, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    job = service.update_job(db, job_id, payload)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete job experience")
def delete_job(job_id: int, db: Session = Depends(get_db), _current_user: str = Depends(get_current_user)):
    success = service.delete_job(db, job_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found")
    return None
