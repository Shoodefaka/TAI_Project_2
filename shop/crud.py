from re import search
from sqlalchemy.orm import Session
from sqlalchemy import select

from . import schemas, models

def get_products_by_category(db: Session, input_category: str, input_name: str, input_priceMin: float, input_priceMax: float):
    category_games = db.query(models.Product).join(models.ProductCategory).join(models.Category).filter(models.Category.name == input_category).all()
    games = []
    if input_name is not None:
        if input_priceMin is not None:
            if input_priceMax is not None:
                for i in category_games:
                    if input_name.lower() in i.name.lower() and i.price <= input_priceMax and i.price >= input_priceMin:
                        games.append(i)
                return games
            else:
                for i in category_games:
                    if input_name.lower() in i.name.lower() and i.price >= input_priceMin:
                        games.append(i)
                return games
        else:
            if input_priceMax is not None:
                for i in category_games:
                    if input_name.lower() in i.name.lower() and i.price <= input_priceMax:
                        games.append(i)
                return games
            else:
                for i in category_games:
                    if input_name.lower() in i.name.lower():
                        games.append(i)
                return games
    else:
        if input_priceMin is not None:
            if input_priceMax is not None:
                for i in category_games:
                    if i.price <= input_priceMax and i.price >= input_priceMin:
                        games.append(i)
                return games
            else:
                for i in category_games:
                    if i.price >= input_priceMin:
                        games.append(i)
                return games
        else:
            if input_priceMax is not None:
                for i in category_games:
                    if i.price <= input_priceMax:
                        games.append(i)
                return games
            else:
                return category_games

def get_product_by_name(db: Session, product: str):
    return db.query(models.Product).filter(models.Product.name.contains(product)).all()

def get_all_product(db: Session):
    return db.query(models.Product).all()

def get_first_product(db: Session):
    return db.query(models.Product).first()

def get_all_images(db: Session):
    return db.query(models.Image).all()

