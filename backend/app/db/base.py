from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

import os

def build_database_url() -> str:
    direct_url = os.getenv("DATABASE_URL")
    if direct_url:
        return direct_url

    db_type = os.getenv("DB_TYPE")
    db_driver = os.getenv("DB_DRIVER")
    db_username = os.getenv("POSTGRES_USER")
    db_password = os.getenv("POSTGRES_PASSWORD")
    db_domain = os.getenv("DB_DOMAIN")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("POSTGRES_DB")

    missing = [
        key for key, value in {
            "DB_TYPE": db_type,
            "POSTGRES_USER": db_username,
            "DB_DOMAIN": db_domain,
            "DB_PORT": db_port,
            "POSTGRES_DB": db_name,
        }.items()
        if value is None
    ]
    if missing:
        raise RuntimeError(f"Missing environment variables: {', '.join(missing)}")

    dialect = f"{db_type}+{db_driver}" if db_driver else db_type
    auth = f"{db_username}:{db_password}" if db_password is not None else db_username
    return f"{dialect}://{auth}@{db_domain}:{db_port}/{db_name}"


DATABASE_URL = build_database_url()

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass
