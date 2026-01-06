from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.models import ProjectModel
from app.schemas.projects import Project, ProjectCreate

class ProjectsRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self) -> list[Project]:
        rows = self.db.execute(select(ProjectModel)).scalars().all()
        # ORM → Pydantic へ詰め替え（Schemaのフィールド名に合わせる）
        return [
            Project(
                id=r.id,
                title=r.title,
                description=r.description,
                technologies=r.technologies or [],
                category=r.category,
                status=r.status,
                year=r.year,
                company=r.company,
                features=r.features or [],
                images=r.images or [],
                githubUrl=r.githubUrl,
                liveUrl=r.liveUrl,
                isPrivate=(r.isPrivate == "true"),
            )
            for r in rows
        ]

    def create(self, data: ProjectCreate) -> Project:
        model = ProjectModel(
            title=data.title,
            description=data.description,
            technologies=data.technologies,
            category=data.category,
            status=data.status,
            year=data.year,
            company=data.company,
            features=data.features,
            images=data.images,
            githubUrl=data.githubUrl,
            liveUrl=data.liveUrl,
            isPrivate="true" if data.isPrivate else "false",
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return Project(
            id=model.id,
            title=model.title,
            description=model.description,
            technologies=model.technologies or [],
            category=model.category,
            status=model.status,
            year=model.year,
            company=model.company,
            features=model.features or [],
            images=model.images or [],
            githubUrl=model.githubUrl,
            liveUrl=model.liveUrl,
            isPrivate=(model.isPrivate == "true"),
        )
