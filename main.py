from fastapi import FastAPI
from src.utils.db import Base, engine
from src.task.router import task_router
from src.user.router import user_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


Base.metadata.create_all(engine)


app = FastAPI(
    title="this is my task management application"
)



app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5501",
        "http://localhost:5501",
        "https://task-mangement-1-p7fp.onrender.com"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



app.include_router(task_router)
app.include_router(user_router)

# This mount stays after the API routers so `/user/*` and `/task/*` reach FastAPI.
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
