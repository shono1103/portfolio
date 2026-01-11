from collections.abc import Sequence
from sqlalchemy.orm import Session
from sqlalchemy import select, delete
from app.db.models import SkillModel

class SkillsRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self) -> list[str]:
        rows = self.db.execute(select(SkillModel.name)).scalars().all()
        return list(rows)

    # 以降は将来のためのメソッド例
    def add_many(self, names: Sequence[str]) -> None:
        existing = set(self.list())
        to_add = [SkillModel(name=n) for n in names if n not in existing]
        self.db.add_all(to_add)
        self.db.commit()

    def create(self, name: str) -> str:
        skill = SkillModel(name=name)
        self.db.add(skill)
        self.db.commit()
        self.db.refresh(skill)
        return skill.name

    def delete(self, name: str) -> bool:
        model = self.db.execute(
            select(SkillModel).where(SkillModel.name == name)
        ).scalar_one_or_none()
        if not model:
            return False
        self.db.delete(model)
        self.db.commit()
        return True

    def clear_all(self) -> None:
        self.db.execute(delete(SkillModel))
        self.db.commit()
