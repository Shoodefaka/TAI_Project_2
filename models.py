from sqlalchemy import  Column, ForeignKey, Integer, String, Numeric, Table
from sqlalchemy.orm import relationship
from database import Base


cart_item = Table('cart_item', Base.metadata, 
    Column('cart_id', Integer, ForeignKey('cart.id'), primary_key=True),
    Column('item_id', Integer, ForeignKey('item.id'), primary_key=True),
    Column('quantity', Numeric(2, 0)))

class Item(Base):
    __tablename__ = "item"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    price = Column(Numeric(5, 2), nullable=False)
    available_items = Column(Numeric(2, 0))
    description = Column(String(250))
    score = Column(Numeric(1, 2))
    category = Column(String(25), nullable=False)
    image_id = Column(Integer, ForeignKey("image.id"))

    images = relationship("Image", back_populates="items")
    carts = relationship("Cart", secondary="cart_item", back_populates="items")

class Image(Base):
    __tablename__ = "image"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    image = Column(String(50000))

    items = relationship("Item", back_populates="images")

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    total = Column(Numeric(10, 2))

    items = relationship("Item", secondary="cart_item", back_populates="carts")
