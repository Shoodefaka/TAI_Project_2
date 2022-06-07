from fastapi import FastAPI, Depends
from . import schemas, models
from .database import SessionLocal, engine
from sqlalchemy.orm import Session


app = FastAPI()

models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/{category}')
async def getByCategory(category, db: Session = Depends(get_db)):
    games = db.query(models.ProductCategory).filter(models.ProductCategory.c.category_id == category).all()
    return games