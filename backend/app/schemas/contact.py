from pydantic import BaseModel, Field, field_validator

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., min_length=3, max_length=254)
    subject: str = Field(..., min_length=1, max_length=120)
    message: str = Field(..., min_length=1, max_length=2000)
    honeypot: str | None = Field(default="")

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        cleaned = value.strip().lower()
        if "@" not in cleaned or "." not in cleaned.split("@", 1)[1]:
            raise ValueError("Please enter a valid email address")
        return cleaned