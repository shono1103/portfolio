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

    def get_by_id(self, job_id: int) -> JobExperience | None:
        row = self.db.execute(
            select(JobExperienceModel).where(JobExperienceModel.id == job_id)
        ).scalar_one_or_none()
        if not row:
            return None
        return JobExperience(
            id=row.id,
            company=row.company,
            companyUrl=row.companyUrl,
            position=row.position,
            duration=row.duration,
            location=row.location,
            achievements=row.achievements or [],
        )

    def update(self, job_id: int, data: JobExperienceCreate) -> JobExperience | None:
        model = self.db.execute(
            select(JobExperienceModel).where(JobExperienceModel.id == job_id)
        ).scalar_one_or_none()
        if not model:
            return None
        model.company = data.company
        model.companyUrl = data.companyUrl
        model.position = data.position
        model.duration = data.duration
        model.location = data.location
        model.achievements = data.achievements
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

    def delete(self, job_id: int) -> bool:
        model = self.db.execute(
            select(JobExperienceModel).where(JobExperienceModel.id == job_id)
        ).scalar_one_or_none()
        if not model:
            return False
        self.db.delete(model)
        self.db.commit()
        return True
