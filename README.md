# DevPortfolio AI Platform

A modern full-stack developer portfolio platform built with React, FastAPI, PostgreSQL, and JWT Authentication.

## Live Demo

Frontend: https://girishgowda-portfolio.vercel.app

Backend API: https://devportfolio-ai.onrender.com/docs

## Features

### Public Portfolio

* Modern responsive UI
* Hero section with profile image
* About Me section
* Skills showcase
* Featured projects
* Contact form

### Admin Dashboard

* Secure JWT Authentication
* Project Management (CRUD)
* Contact Message Management
* Dashboard Statistics
* Protected Routes

### Backend

* FastAPI REST API
* PostgreSQL Database
* SQLAlchemy ORM
* JWT Authentication
* Password Hashing
* CORS Support

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router
* Framer Motion

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Passlib

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)

## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

Backend:

```env
DATABASE_URL=your_postgresql_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Frontend:

```env
VITE_API_URL=https://devportfolio-ai.onrender.com
```

## Project Structure

```text
backend/
├── app/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   ├── database/
│   └── utils/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   └── context/
```

## Author

Girish Gowda

Full Stack Developer | Python Developer | AI/ML Enthusiast
