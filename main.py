from fastapi import FastAPI
from src.utils.db import Base, engine
from src.task.router import task_router
from src.user.router import user_router
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(engine)


app = FastAPI(
    title="this is my task management application"
)



app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5501",
        "http://localhost:5501"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



app.include_router(task_router)
app.include_router(user_router)