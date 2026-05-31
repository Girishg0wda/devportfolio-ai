from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from fastapi import HTTPException
from app.database.deps import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate  
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects


@router.post("/")
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
# ):
# @router.post("/")
# def create_project(
#     project: ProjectCreate,
#     db: Session = Depends(get_db)
):

    new_project = Project(
        title=project.title,
        description=project.description,
        tech_stack=project.tech_stack,
        github_link=project.github_link,
        live_link=project.live_link,
        image=project.image
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project

@router.get("/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        return {"message": "Project not found"}

    return project

@router.put("/{project_id}")
def update_project(
    project_id: int,
    project: ProjectCreate,
    db: Session = Depends(get_db)
):

    existing_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not existing_project:
        return {"message": "Project not found"}

    existing_project.title = project.title
    existing_project.description = project.description
    existing_project.tech_stack = project.tech_stack
    existing_project.github_link = project.github_link
    existing_project.live_link = project.live_link
    existing_project.image = project.image

    db.commit()

    return existing_project

@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
    )

    db.delete(project)

    db.commit()

    return {
        "message": "Project deleted successfully"
    }