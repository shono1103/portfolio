from collections.abc import Callable
from sqlalchemy.orm import Session
from app.repositories.jobs_repo import JobsRepository
from app.schemas.jobs import JobExperience, JobExperienceCreate

RepoFactory = Callable[[Session], JobsRepository]

class JobsService:
    def __init__(self, repo_factory: RepoFactory | None = None):
        self.repo_factory = repo_factory or JobsRepository

    def list_jobs(self, db: Session) -> list[JobExperience]:
        repo = self.repo_factory(db)
        return repo.list()

    def create_job(self, db: Session, job: JobExperienceCreate) -> JobExperience:
        repo = self.repo_factory(db)
        return repo.create(job)

    def get_job(self, db: Session, job_id: int) -> JobExperience | None:
        repo = self.repo_factory(db)
        return repo.get_by_id(job_id)

    def update_job(self, db: Session, job_id: int, job: JobExperienceCreate) -> JobExperience | None:
        repo = self.repo_factory(db)
        return repo.update(job_id, job)

    def delete_job(self, db: Session, job_id: int) -> bool:
        repo = self.repo_factory(db)
        return repo.delete(job_id)
