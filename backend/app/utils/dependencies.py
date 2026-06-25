from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError

security = HTTPBearer(auto_error=False)

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security)
):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return payload

    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc


def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials | None = Depends(security)
):
    if credentials is None:
        return None

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except JWTError:
        return None