from email import header
from fastapi import FastAPI, Depends, status, HTTPException, Request
from . import schemas, models, crud
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import requests
# from starlette.responses import RedirectResponse
from fastapi.responses import RedirectResponse

app = FastAPI()

origins = {
    "http://localhost:3000",
    "https://localhost:3000",
    "https://secure.payu.com",
    "http://secure.payu.com"
}

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
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

# @app.middleware("http")
# async def add_headers(request: Request, call_next):
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = '*'
#     return response


@app.get('/category/{category}')
async def getByCategory(category: Optional[str] = None, name: Optional[str] = None, priceMin: Optional[float] = None, priceMax: Optional[float] = None, db: Session = Depends(get_db)):
    try: 
        games = crud.get_products_by_category(db, category, name, priceMin, priceMax)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="HTTP500 - Error get_products_by_category")
    if not games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="HTTP404 - Category not found get_products_by_category")
    return games
                

@app.get('/product/all')
async def getAllProducts(db: Session = Depends(get_db)):
    try:
        all_games = crud.get_all_product(db)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="HTTP500 - get_all_product")
    if not all_games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="HTTP404 - Category not found get_all_product")
    return all_games

@app.get('/images/{id}')
async def getImagesById(id: int, db: Session = Depends(get_db)):
    try:
        all_images = crud.get_images_by_id(db, id)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="HTTP500 - get_all_product")
    if not all_images:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="HTTP404 - Category not found get_all_product")
    return all_images

@app.post('/payment')
async def postPayment(user_pay_info:schemas.UserPayInfo):
    params = {
        "grant_type": "client_credentials",
        "client_id": "145227",
        "client_secret": "12f071174cb7eb79d4aac5bc2f07563f"
    }

    get_access_token_url = "https://secure.payu.com/pl/standard/user/oauth/authorize"
    resp = requests.get(get_access_token_url, params=params)

    access_token = resp.json()["access_token"]

    pay = {
        "notifyUrl": "http://localhost:3000/",
        "customerIp": "127.0.0.1",
        "merchantPosId": "145227",
        "description": "Uśmiechnięte planszówki",
        "currencyCode": "PLN",
        "totalAmount": user_pay_info.total_cost,
        # "continueUrl": "https://localhost:3000/test",
        "buyer": {
            "firstName": user_pay_info.firstname,
            "lastname": user_pay_info.lastname,
            "phone": user_pay_info.phone,
            "email": user_pay_info.email,
            "language": "pl"
        },
        "products": [
            {
                "name": "Placeholder",
                "unitPrice": "100",
                "quantity": "1"
            }
        ]
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access_token,
    }

    url="https://secure.payu.com/api/v2_1/orders"

    req = requests.post(url, json=pay, headers=headers, allow_redirects=False)
    
    print(req.json())

    url_pay_success = req.json()["redirectUri"]

    temp = requests.get(url_pay_success)

    # 

    return url_pay_success