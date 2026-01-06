import os
from app.db.base import SessionLocal, engine, Base
from app.db.models import SkillModel, ProjectModel, JobExperienceModel

def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # skills
        default_skills = [
            "Python","Typescript","C++","Shell","React","FastAPI",
            "Docker","Git","HTML5","CSS3","AWS","Linux",
            "JavaScript","C","GDB","WSL2"
        ]
        existing = {s.name for s in db.query(SkillModel).all()}
        for name in default_skills:
            if name not in existing:
                db.add(SkillModel(name=name))

        # projects（例として1件だけ投入。必要に応じて増やす）
        if not db.query(ProjectModel).first():
            db.add(ProjectModel(
                title="こんにちは",
                description="Built a comprehensive real-time notification module using Django and MongoDB...",
                technologies=["Django","MongoDB","WebSocket","End-to-End Encryption","Python"],
                category="Backend Development",
                status="Completed",
                year="2024",
                company="Mak Design Private Limited",
                features=[
                    "Real-time delivery of notifications",
                    "End-to-end encryption for security",
                    "Scalable MongoDB backend",
                    "WebSocket integration for instant updates",
                ],
                images=[],
                githubUrl=None,
                liveUrl=None,
                isPrivate="true",
            ))

        # jobs（例として1件）
        if not db.query(JobExperienceModel).first():
            db.add(JobExperienceModel(
                company="SCREEN ICTソフトウエア",
                companyUrl="https://www.makdesign.in/",
                position="Software Development Engineer",
                duration="May 2024 – Present",
                location="Mumbai, Maharashtra (Remote)",
                achievements=[
                    "Built a real-time notification module using Django and MongoDB...",
                    "Created a framework for performance analytics ...",
                ],
            ))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    run()
