import re
import time

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.utils.dependencies import get_current_user_optional
from app.utils.email import (
    send_contact_notification,
    send_auto_reply,
)

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

RATE_LIMIT_WINDOW_SECONDS = 30

recent_submissions = {}

SPAM_KEYWORDS = [
    "buy now",
    "click here",
    "crypto",
    "free money",
    "lottery",
    "viagra",
    "winner",
    "cash",
]

URL_PATTERN = re.compile(r"https?://|www\.")


def _is_probable_spam(contact: ContactCreate, client_ip: str) -> tuple[bool, str]:
    combined_text = " ".join([
        contact.name,
        str(contact.email),
        contact.subject,
        contact.message,
    ]).lower()

    if contact.honeypot and contact.honeypot.strip():
        return True, "Bot submission detected."

    if URL_PATTERN.search(combined_text):
        return True, "Links are not allowed in contact messages."

    if any(keyword in combined_text for keyword in SPAM_KEYWORDS):
        return True, "Your message looks like spam."

    if len(contact.message.strip()) < 3:
        return True, "Please write a slightly longer message."

    return False, ""


def _is_rate_limited(email: str, client_ip: str) -> bool:
    now = time.time()

    expired_keys = [
        key
        for key, timestamp in list(recent_submissions.items())
        if now - timestamp > RATE_LIMIT_WINDOW_SECONDS
    ]

    for key in expired_keys:
        recent_submissions.pop(key, None)

    submission_key = f"{email.lower()}::{client_ip}"

    if submission_key in recent_submissions:
        return True

    recent_submissions[submission_key] = now
    return False


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_contact(
    contact: ContactCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    client_ip = (
        request.headers.get("x-forwarded-for")
        or (request.client.host if request.client else "unknown")
    )

    is_spam, spam_message = _is_probable_spam(contact, client_ip)

    if is_spam:
        raise HTTPException(status_code=400, detail=spam_message)

    if _is_rate_limited(str(contact.email), client_ip):
        raise HTTPException(
            status_code=429,
            detail="Please wait a moment before sending another message.",
        )

    new_contact = Contact(
        name=contact.name.strip(),
        email=str(contact.email).strip(),
        subject=contact.subject.strip(),
        message=contact.message.strip(),
        is_read=False,
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    notification_error = None
    auto_reply_error = None

    try:
        send_contact_notification(new_contact)
    except Exception as exc:
        notification_error = str(exc)

    try:
        send_auto_reply(new_contact)
    except Exception as exc:
        auto_reply_error = str(exc)

    return {
        "message": "Contact submitted successfully.",
        "contact": {
            "id": new_contact.id,
            "name": new_contact.name,
            "email": new_contact.email,
            "subject": new_contact.subject,
        },
        "notification_error": notification_error,
        "auto_reply_error": auto_reply_error,
    }


@router.get("/")
def get_contacts(
    db: Session = Depends(get_db),
    current_user: dict | None = Depends(get_current_user_optional),
):
    return db.query(Contact).order_by(desc(Contact.id)).all()


@router.patch("/{contact_id}/read")
def mark_contact_as_read(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: dict | None = Depends(get_current_user_optional),
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    contact = db.query(Contact).filter(Contact.id == contact_id).first()

    if not contact:
        raise HTTPException(status_code=404, detail="Message not found")

    contact.is_read = True

    db.commit()
    db.refresh(contact)

    return contact