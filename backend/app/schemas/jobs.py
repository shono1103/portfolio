from pydantic import BaseModel

class JobExperienceBase(BaseModel):
    company: str
    companyUrl: str
    position: str
    duration: str
    location: str
    achievements: list[str]

class JobExperience(JobExperienceBase):
    id: int

class JobExperienceCreate(JobExperienceBase):
    pass
