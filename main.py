import models
from fastapi import FastAPI
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/category/{category_name}")
async def category(category_name: str):
    return {"category": category_name}

@app.get("/account")
async def account():
    return {"message": "account"}

@app.get("/cart")
async def account():
    return {"message": "cart"}

