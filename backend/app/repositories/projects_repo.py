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

    def get_by_id(self, project_id: int) -> Project | None:
        row = self.db.execute(
            select(ProjectModel).where(ProjectModel.id == project_id)
        ).scalar_one_or_none()
        if not row:
            return None
        return Project(
            id=row.id,
            title=row.title,
            description=row.description,
            technologies=row.technologies or [],
            category=row.category,
            status=row.status,
            year=row.year,
            company=row.company,
            features=row.features or [],
            images=row.images or [],
            githubUrl=row.githubUrl,
            liveUrl=row.liveUrl,
            isPrivate=(row.isPrivate == "true"),
        )

    def update(self, project_id: int, data: ProjectCreate) -> Project | None:
        model = self.db.execute(
            select(ProjectModel).where(ProjectModel.id == project_id)
        ).scalar_one_or_none()
        if not model:
            return None
        model.title = data.title
        model.description = data.description
        model.technologies = data.technologies
        model.category = data.category
        model.status = data.status
        model.year = data.year
        model.company = data.company
        model.features = data.features
        model.images = data.images
        model.githubUrl = data.githubUrl
        model.liveUrl = data.liveUrl
        model.isPrivate = "true" if data.isPrivate else "false"
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

    def delete(self, project_id: int) -> bool:
        model = self.db.execute(
            select(ProjectModel).where(ProjectModel.id == project_id)
        ).scalar_one_or_none()
        if not model:
            return False
        self.db.delete(model)
        self.db.commit()
        return True
