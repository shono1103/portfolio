from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models import JobExperienceModel
from app.schemas.jobs import JobExperience, JobExperienceCreate

class JobsRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self) -> list[JobExperience]:
        rows = self.db.execute(select(JobExperienceModel)).scalars().all()
        return [
            JobExperience(
                id=r.id,
                company=r.company,
                companyUrl=r.companyUrl,
                position=r.position,
                duration=r.duration,
                location=r.location,
                achievements=r.achievements or [],
            )
            for r in rows
        ]

    def create(self, data: JobExperienceCreate) -> JobExperience:
        model = JobExperienceModel(
            company=data.company,
            companyUrl=data.companyUrl,
            position=data.position,
            duration=data.duration,
            location=data.location,
            achievements=data.achievements,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return JobExperience(
            id=model.id,
            company=model.company,
            companyUrl=model.companyUrl,
            position=model.position,
            duration=model.duration,
            location=model.location,
            achievements=model.achievements or [],
        )
