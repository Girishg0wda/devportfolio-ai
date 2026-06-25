from sqlalchemy import Boolean, Column, Integer, String, Text
from app.database.db import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String)

    subject = Column(String)

    message = Column(Text)
    is_read = Column(Boolean, default=False, nullable=False)