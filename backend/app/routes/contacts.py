from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

@router.post("/")
def create_contact(
    contact: ContactCreate,
    db: Session = Depends(get_db)
):
    new_contact = Contact(
        name=contact.name,
        email=contact.email,
        subject=contact.subject,
        message=contact.message
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return new_contact

@router.get("/")
def get_contacts(
    db: Session = Depends(get_db)
):
    return db.query(Contact).all()