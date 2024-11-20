from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Simplified OpenAlex Search API")

app.include_router(router)
