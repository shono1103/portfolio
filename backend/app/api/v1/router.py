from fastapi import APIRouter
from . import skills, projects, jobs

api_v1 = APIRouter(prefix="/api")
api_v1.include_router(skills.router)
api_v1.include_router(projects.router)
api_v1.include_router(jobs.router)
