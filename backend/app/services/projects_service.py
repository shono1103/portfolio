from collections.abc import Callable
from sqlalchemy.orm import Session
from app.repositories.projects_repo import ProjectsRepository
from app.schemas.projects import Project, ProjectCreate

RepoFactory = Callable[[Session], ProjectsRepository]

class ProjectsService:
    def __init__(self, repo_factory: RepoFactory | None = None):
        self.repo_factory = repo_factory or ProjectsRepository

    def list_projects(self, db: Session) -> list[Project]:
        repo = self.repo_factory(db)
        return repo.list()

    def create_project(self, db: Session, project: ProjectCreate) -> Project:
        repo = self.repo_factory(db)
        return repo.create(project)

    def get_project(self, db: Session, project_id: int) -> Project | None:
        repo = self.repo_factory(db)
        return repo.get_by_id(project_id)

    def update_project(self, db: Session, project_id: int, project: ProjectCreate) -> Project | None:
        repo = self.repo_factory(db)
        return repo.update(project_id, project)

    def delete_project(self, db: Session, project_id: int) -> bool:
        repo = self.repo_factory(db)
        return repo.delete(project_id)
