from typing import Optional
from pydantic import BaseModel

class ProjectBase(BaseModel):
    title: str
    description: str
    technologies: list[str]
    category: str
    status: str
    year: str
    company: str
    features: list[str]
    images: list[str]
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    isPrivate: bool = False

class Project(ProjectBase):
    id: int

class ProjectCreate(ProjectBase):
    pass
