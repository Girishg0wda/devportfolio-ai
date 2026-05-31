from pydantic import BaseModel

class ProjectCreate(BaseModel):
    title: str
    description: str
    tech_stack: str
    github_link: str
    live_link: str
    image: str


class ProjectResponse(ProjectCreate):
    id: int

    class Config:
        from_attributes = True