from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

from app.models.user import User
from app.models.project import Project
from app.models.contact import Contact
from app.routes.projects import router as project_router
from app.routes.auth import router as auth_router
from app.routes.contacts import router as contact_router
from app.routes.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://devportfolio-ai-chi.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project_router)
app.include_router(auth_router)
app.include_router(contact_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {"message": "Backend Running"}