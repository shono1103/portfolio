from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.db.base import Base

# users for authentication
class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)

# skills は単純：name のみ
class SkillModel(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)

# projects は JSONB を活用してまずはシンプルに
class ProjectModel(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(JSONB, nullable=False, default=list)  # list[str]
    category = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)
    year = Column(String(10), nullable=False)
    company = Column(String(200), nullable=False)
    features = Column(JSONB, nullable=False, default=list)      # list[str]
    images = Column(JSONB, nullable=False, default=list)        # list[str]
    githubUrl = Column(String(500), nullable=True)
    liveUrl = Column(String(500), nullable=True)
    isPrivate = Column(String(5), nullable=False, default="false")  # "true"/"false"で保持（互換優先）

# job experiences も achievements を JSONB に
class JobExperienceModel(Base):
    __tablename__ = "job_experiences"
    id = Column(Integer, primary_key=True, autoincrement=True)
    company = Column(String(200), nullable=False)
    companyUrl = Column(String(500), nullable=False)
    position = Column(String(200), nullable=False)
    duration = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    achievements = Column(JSONB, nullable=False, default=list)  # list[str]
