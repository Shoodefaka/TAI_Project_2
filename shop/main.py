from fastapi import FastAPI, Depends, Response, status, HTTPException
from . import schemas, models, crud
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

origins = {
    "http://localhost:3000",
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/category/{category}')
async def getByCategory(category: str, name: Optional[str] = None, priceMin: Optional[float] = None, priceMax: Optional[float] = None, db: Session = Depends(get_db)):
    try: 
        games = crud.get_products_by_category(db, category, name, priceMin, priceMax)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="HTTP500 - Error get_products_by_category")
    if not games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="HTTP404 - Category not found get_products_by_category")
    return games
                

@app.get('/product/all')
async def getAllProducts(response: Response, db: Session = Depends(get_db)):
    all_games = crud.get_all_product(db)
    if not all_games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products found")
    return all_games

@app.get('/product/first')
async def getFirstProducts(response: Response, db: Session = Depends(get_db)):
    first_game = crud.get_first_product(db)
    if not first_game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products found")
    return first_game

@app.get('/product/{product}')
async def getProduct(product: str, response: Response, db: Session = Depends(get_db)):
    game =  crud.get_product_by_name(db, product)
    if not game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return game

@app.get('/images/all')
async def getAllImages(response: Response, db: Session = Depends(get_db)):
    all_images = crud.get_all_images(db)
    if not all_images:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No images found")
    return all_images

