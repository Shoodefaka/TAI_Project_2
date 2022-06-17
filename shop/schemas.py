from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    name: str
    price: float
    available: Optional[float]
    description: Optional[str]
    score: Optional[float]
    category: str

class Image(BaseModel):
    name: str
    image: str
    product_id: int

class Category(BaseModel):
    name: str

class ProductCategory(BaseModel):
    product_id: int
    category_id: int

# class UserPayInfo(BaseModel):
#     # firstname: str
#     # lastname: str
#     # email: str
#     # phone: str
#     # total_cost: str
#     # products: list