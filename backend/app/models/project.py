from sqlalchemy import Column, Integer, String, Text
from app.database.db import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text)

    tech_stack = Column(String)

    github_link = Column(String)

    live_link = Column(String)

    image = Column(String)