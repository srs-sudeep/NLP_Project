from fastapi import FastAPI
from app.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Simplified OpenAlex Search API")
origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)
