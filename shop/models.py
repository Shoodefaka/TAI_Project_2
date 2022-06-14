from sqlalchemy import Column, ForeignKey, Integer, String, Numeric, Table
from .database import Base

ProductCategory = Table('productCategory', Base.metadata,
    Column('product_id', Integer, ForeignKey('product.id'), primary_key=True),
    Column('category_id', Integer, ForeignKey('category.id'), primary_key=True))

class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(5, 2), nullable=False)
    available = Column(Numeric(2, 0))
    description = Column(String(1000))
    preview = Column(String(50000))
    score = Column(Numeric(2, 1))


class Image(Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    image_base64 = Column(String(50000))
    product_id = Column(Integer, ForeignKey("product.id"))


class Category(Base):
    __tablename__ = "category"
    id = Column(Integer, primary_key=True)
    name = Column(String(25), nullable=False)
