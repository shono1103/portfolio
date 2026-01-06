from collections.abc import Callable
from sqlalchemy.orm import Session
from app.repositories.skills_repo import SkillsRepository
from app.schemas.skills import Skill

RepoFactory = Callable[[Session], SkillsRepository]

class SkillsService:
    def __init__(self, repo_factory: RepoFactory | None = None):
        self.repo_factory = repo_factory or SkillsRepository

    def list_skills(self, db: Session) -> list[str]:
        # 将来: フィルタ、ソート、キャッシュ等のビジネスロジック
        repo = self.repo_factory(db)
        return repo.list()

    def create_skill(self, db: Session, skill: Skill) -> str:
        repo = self.repo_factory(db)
        return repo.create(skill.name)
