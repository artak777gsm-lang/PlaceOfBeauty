from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    name: str
    description: Optional[str] = ""
    price: str
    duration: str
    image: Optional[str] = ""

class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    date: str
    service: str
    text: str
    rating: int = 5

class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    alt: str
    category: str

class SalonInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str
    address: str
    phone: str
    email: Optional[str] = ""
    hours: dict
    rating: float
    reviews_count: int
    amenities: List[str]
    booksy_url: str
    facebook_url: str
    description: str

# Seed data
SERVICES_DATA = [
    {"category": "Manicure", "name": "Manicure hybrydowe", "price": "120 zł", "duration": "1 godz.", "description": "Profesjonalny manicure z lakierem hybrydowym"},
    {"category": "Manicure", "name": "Manicure klasyczne bez malowania", "price": "70 zł", "duration": "30 min", "description": "Klasyczna pielęgnacja paznokci"},
    {"category": "Manicure", "name": "Manicure klasyczne z malowaniem", "price": "80 zł", "duration": "30 min", "description": "Manicure z tradycyjnym lakierem"},
    {"category": "Manicure", "name": "Manicure męski", "price": "70 zł", "duration": "30 min", "description": "Profesjonalna pielęgnacja dłoni dla mężczyzn"},
    {"category": "Pedicure", "name": "Pedicure klasyczne z lakierem", "price": "140 zł", "duration": "1 godz.", "description": "Klasyczny pedicure z malowaniem"},
    {"category": "Pedicure", "name": "Pedicure klasyczny + hybryda", "price": "160 zł", "duration": "1 godz. 10 min", "description": "Pedicure z lakierem hybrydowym"},
    {"category": "Pedicure", "name": "Pedicure kwasowe + hybryda", "price": "180 zł", "duration": "1 godz. 10 min", "description": "Zabieg kwasowy Mavex z hybryda"},
    {"category": "Pedicure", "name": "Leczniczy pedicure", "price": "od 150 zł", "duration": "1 godz.", "description": "Zabieg podologiczny dostosowany indywidualnie do stanu stóp"},
    {"category": "Stylizacja paznokci", "name": "Przedłużanie żelowe", "price": "od 180 zł", "duration": "1 godz. 30 min", "description": "Przedłużenie paznokci metodą żelową"},
    {"category": "Stylizacja paznokci", "name": "Uzupełnienie żelowe", "price": "150 zł", "duration": "1 godz. 15 min", "description": "Uzupełnienie paznokci metodą żelową"},
    {"category": "Depilacja laserowa", "name": "Pachy", "price": "200 zł", "duration": "15 min", "description": "Depilacja laserowa Primelase"},
    {"category": "Depilacja laserowa", "name": "Całe nogi", "price": "550 zł", "duration": "50 min", "description": "Łydki i uda — depilacja laserowa Primelase"},
    {"category": "Depilacja laserowa", "name": "Bikini płytkie", "price": "220 zł", "duration": "20 min", "description": "Depilacja laserowa Primelase"},
    {"category": "Depilacja laserowa", "name": "Bikini głębokie", "price": "300 zł", "duration": "30 min", "description": "Depilacja laserowa Primelase"},
    {"category": "Depilacja laserowa", "name": "Wąsik", "price": "100 zł", "duration": "10 min", "description": "Depilacja laserowa Primelase"},
    {"category": "Depilacja laserowa", "name": "Nogi + pachy + bikini", "price": "750 zł", "duration": "1 godz. 45 min", "description": "Pakiet — depilacja laserowa Primelase"},
    {"category": "Kosmetyka", "name": "Henna brwi", "price": "30 zł", "duration": "15 min", "description": "Koloryzacja brwi henną"},
    {"category": "Kosmetyka", "name": "Henna + regulacja", "price": "40 zł", "duration": "20 min", "description": "Henna z regulacją kształtu brwi"},
    {"category": "Kosmetyka", "name": "Henna rzęs", "price": "30 zł", "duration": "15 min", "description": "Koloryzacja rzęs henną"},
    {"category": "Kosmetyka", "name": "Regulacja brwi", "price": "20 zł", "duration": "10 min", "description": "Profesjonalna regulacja brwi"},
    {"category": "Kosmetyka", "name": "Depilacja wąsika nitką", "price": "15 zł", "duration": "5 min", "description": "Szybka i precyzyjna depilacja nitkowa"},
    {"category": "Zabiegi na twarz", "name": "Dermaplaning", "price": "Zapytaj o cenę", "duration": "45 min", "description": "Zabieg złuszczający poprawiający wygląd skóry"},
    {"category": "Zabiegi na twarz", "name": "Oczyszczanie twarzy", "price": "Zapytaj o cenę", "duration": "1 godz.", "description": "Głębokie oczyszczanie twarzy"},
    {"category": "Zabiegi na twarz", "name": "Zabieg przeciwtrądzikowy", "price": "Zapytaj o cenę", "duration": "1 godz.", "description": "Specjalistyczny zabieg na trądzik"},
    {"category": "Makijaż", "name": "Makijaż okazjonalny", "price": "Zapytaj o cenę", "duration": "1 godz.", "description": "Profesjonalny makijaż na każdą okazję"},
    {"category": "Makijaż", "name": "Makijaż ślubny", "price": "Zapytaj o cenę", "duration": "1 godz. 30 min", "description": "Luksusowy makijaż na ślub"},
    {"category": "Modelowanie ciała", "name": "Elektrostymulacja mięśni EMS", "price": "100 zł", "duration": "30 min", "description": "Technologia HI-EMT — budowanie mięśni i redukcja tkanki tłuszczowej"},
    {"category": "Piercing", "name": "Przekłuwanie uszu", "price": "od 100 zł", "duration": "10 min", "description": "Profesjonalny piercing uszu"},
    {"category": "Piercing", "name": "Przekłuwanie nosa", "price": "180 zł", "duration": "10 min", "description": "Profesjonalny piercing nosa"},
]

REVIEWS_DATA = [
    {"name": "Katarzyna", "date": "marzec 2026", "service": "Manicure hybrydowe", "text": "Super, bardzo polecam.", "rating": 5},
    {"name": "Sandra", "date": "luty 2026", "service": "Przekłuwanie uszu", "text": "Córka zadowolona, Pani przemiła. Polecam z całego serca!", "rating": 5},
    {"name": "Katarzyna", "date": "styczeń 2026", "service": "Manicure hybrydowe", "text": "Super kontakt z klientem, pani bardzo miła, perfekcyjna stylizacja paznokci. Polecam bardzo!", "rating": 5},
    {"name": "Наталя", "date": "styczeń 2026", "service": "Depilacja laserowa", "text": "Polecam!", "rating": 5},
    {"name": "Edyta", "date": "grudzień 2025", "service": "Przedłużenie żelowe", "text": "Polecam bardzo!", "rating": 5},
    {"name": "Paulina", "date": "listopad 2025", "service": "Depilacja laserowa", "text": "Bardzo profesjonalne podejście do Klienta. Super atmosfera i co najważniejsze efekty widoczne już po pierwszym razie.", "rating": 5},
    {"name": "Izabela", "date": "listopad 2025", "service": "Przekłuwanie uszu", "text": "Polecam!", "rating": 5},
    {"name": "Elżbieta", "date": "listopad 2025", "service": "Uzupełnienie żelowe + henna", "text": "Pięknie wykonany manicure, duży wybór niespotykanych kolorów lakierów, przemiła atmosfera.", "rating": 5},
    {"name": "Bożena", "date": "październik 2025", "service": "Manicure hybrydowe", "text": "Miła profesjonalna wizyta. Zawsze dobre rady odnośnie doboru koloru paznokci. Jestem zadowolona i umówiona na kolejną wizytę.", "rating": 5},
    {"name": "Malwina", "date": "październik 2025", "service": "Uzupełnienie żelowe", "text": "Od pierwszego razu wierna klientka. Paznokietki pięknie i estetycznie wykonane. Polecam p. Carikę!", "rating": 5},
]

GALLERY_DATA = [
    {"url": "/gallery/465318305602361.jpg", "alt": "Salon Place of Beauty — widok z zewnątrz", "category": "Salon"},
    {"url": "/gallery/1185245526942965.jpg", "alt": "Zabieg presoterapii w salonie", "category": "Zabiegi"},
    {"url": "/gallery/1197425395724978.jpg", "alt": "Depilacja laserowa Primelase", "category": "Zabiegi"},
    {"url": "/gallery/1137041761763342.jpg", "alt": "Presoterapia — modelowanie sylwetki", "category": "Zabiegi"},
    {"url": "/gallery/1186873956780122.jpg", "alt": "Zabieg w salonie Place of Beauty", "category": "Zabiegi"},
    {"url": "/gallery/1186874330113418.jpg", "alt": "Profesjonalny zabieg kosmetyczny", "category": "Zabiegi"},
    {"url": "/gallery/1080256257441893.jpg", "alt": "Gabinet presoterapii", "category": "Salon"},
    {"url": "/gallery/1023044393163080.jpg", "alt": "Różowy manicure z wzorami", "category": "Paznokcie"},
    {"url": "/gallery/632346295566227.jpg", "alt": "Stylizacja czarno-srebrna", "category": "Paznokcie"},
    {"url": "/gallery/840030858131102.jpg", "alt": "Manicure ze złotą folią", "category": "Paznokcie"},
    {"url": "/gallery/899421005525420.jpg", "alt": "Niebieski manicure hybrydowy", "category": "Paznokcie"},
    {"url": "/gallery/834394008694787.jpg", "alt": "Zielony manicure klasyczny", "category": "Paznokcie"},
    {"url": "/gallery/722422606558595.jpg", "alt": "Stylizacja paznokci", "category": "Paznokcie"},
    {"url": "/gallery/702593705208152.jpg", "alt": "Manicure artystyczny", "category": "Paznokcie"},
    {"url": "/gallery/709708574496665.jpg", "alt": "Elegancki manicure hybrydowy", "category": "Paznokcie"},
    {"url": "/gallery/751000080367514.jpg", "alt": "Kolorowa stylizacja paznokci", "category": "Paznokcie"},
    {"url": "/gallery/822283203239201.jpg", "alt": "Delikatny manicure", "category": "Paznokcie"},
    {"url": "/gallery/1016682560465930.jpg", "alt": "Paznokcie żelowe", "category": "Paznokcie"},
    {"url": "/gallery/1025275046273348.jpg", "alt": "Stylizacja na specjalną okazję", "category": "Paznokcie"},
    {"url": "/gallery/1132183195582532.jpg", "alt": "Zabieg kosmetyczny", "category": "Zabiegi"},
    {"url": "/gallery/577294877738036.jpg", "alt": "Wnętrze salonu kosmetycznego", "category": "Salon"},
    {"url": "/gallery/720881880046001.jpg", "alt": "Wzory na paznokciach", "category": "Paznokcie"},
    {"url": "/gallery/763084945825694.jpg", "alt": "Manicure z dekoracjami", "category": "Paznokcie"},
    {"url": "/gallery/907808834686637.jpg", "alt": "Profesjonalna stylizacja", "category": "Paznokcie"},
    {"url": "/gallery/994924329308420.jpg", "alt": "Piękne paznokcie", "category": "Paznokcie"},
    {"url": "/gallery/1183262007141317.jpg", "alt": "Manicure glamour", "category": "Paznokcie"},
    {"url": "/gallery/546745167459674.jpg", "alt": "Stylizacja paznokci żelowych", "category": "Paznokcie"},
    {"url": "/gallery/1023899656410887.jpg", "alt": "Salon — stanowisko pracy", "category": "Salon"},
]

SALON_INFO = {
    "name": "Place of Beauty",
    "address": "Garbarska 17/2, 05-825 Grodzisk Mazowiecki",
    "phone": "+48 881 777 437",
    "email": "",
    "hours": {
        "Poniedziałek": "9:00 - 20:00",
        "Wtorek": "9:00 - 20:00",
        "Środa": "9:00 - 20:00",
        "Czwartek": "9:00 - 20:00",
        "Piątek": "9:00 - 20:00",
        "Sobota": "9:00 - 20:00",
        "Niedziela": "Zamknięte"
    },
    "rating": 4.9,
    "reviews_count": 272,
    "amenities": ["Parking", "Akceptacja kart płatniczych", "Zwierzęta dozwolone", "Przyjazne dla dzieci"],
    "booksy_url": "https://booksy.com/pl-pl/103643_place-of-beauty-carika_paznokcie_4424_grodzisk-mazowiecki",
    "facebook_url": "https://www.facebook.com/placeofbeauty",
    "description": "Place of Beauty to salon kosmetyczny w Grodzisku Mazowieckim, oferujący szeroką gamę profesjonalnych zabiegów pielęgnacyjnych. Nasz zespół specjalistów zadba o Twoje piękno i dobre samopoczucie w przyjaznej, luksusowej atmosferze."
}

async def seed_data():
    svc_count = await db.services.count_documents({})
    if svc_count == 0:
        for s in SERVICES_DATA:
            svc = Service(**s)
            doc = svc.model_dump()
            await db.services.insert_one(doc)
        logging.info("Seeded services data")

    rev_count = await db.reviews.count_documents({})
    if rev_count == 0:
        for r in REVIEWS_DATA:
            rev = Review(**r)
            doc = rev.model_dump()
            await db.reviews.insert_one(doc)
        logging.info("Seeded reviews data")

    gal_count = await db.gallery.count_documents({})
    if gal_count == 0:
        for g in GALLERY_DATA:
            gal = GalleryItem(**g)
            doc = gal.model_dump()
            await db.gallery.insert_one(doc)
        logging.info("Seeded gallery data")

    info_count = await db.salon_info.count_documents({})
    if info_count == 0:
        await db.salon_info.insert_one(SALON_INFO)
        logging.info("Seeded salon info")

@app.on_event("startup")
async def startup():
    await seed_data()

# Routes
@api_router.get("/")
async def root():
    return {"message": "Place of Beauty API"}

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(1000)
    return services

@api_router.get("/services/{category}")
async def get_services_by_category(category: str):
    services = await db.services.find({"category": category}, {"_id": 0}).to_list(1000)
    return services

@api_router.get("/reviews", response_model=List[Review])
async def get_reviews():
    reviews = await db.reviews.find({}, {"_id": 0}).to_list(1000)
    return reviews

@api_router.get("/gallery", response_model=List[GalleryItem])
async def get_gallery():
    items = await db.gallery.find({}, {"_id": 0}).to_list(1000)
    return items

@api_router.get("/salon-info")
async def get_salon_info():
    info = await db.salon_info.find_one({}, {"_id": 0})
    return info

@api_router.get("/categories")
async def get_categories():
    categories = await db.services.distinct("category")
    return categories

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
