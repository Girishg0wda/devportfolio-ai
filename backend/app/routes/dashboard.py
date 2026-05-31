from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.project import Project
from app.models.contact import Contact
from app.models.user import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    project_count = db.query(Project).count()

    contact_count = db.query(Contact).count()

    user_count = db.query(User).count()

    return {
        "projects": project_count,
        "contacts": contact_count,
        "users": user_count
    }