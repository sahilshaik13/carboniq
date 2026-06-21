"""
CarbonIQ Backend API - FastAPI server for emission calculation and data management
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthCredential
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
import os
from functools import lru_cache

# Initialize FastAPI
app = FastAPI(title="CarbonIQ API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret-key-change-in-production")
ALGORITHM = "HS256"

# ============= Models =============

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ActivityLog(BaseModel):
    user_id: str
    category: str  # transport, energy, food, etc
    subcategory: str  # car, electricity, meat, etc
    value: float  # km, kWh, kg, etc
    unit: str  # km, kWh, kg, etc
    date: datetime
    notes: Optional[str] = None

class ActivityResponse(ActivityLog):
    id: str
    emissions_kg_co2e: float
    created_at: datetime

class DashboardStats(BaseModel):
    total_emissions_month: float
    total_emissions_year: float
    daily_average: float
    top_categories: List[dict]
    trend: str  # "up" or "down"

class InsightResponse(BaseModel):
    title: str
    description: str
    recommendation: str
    potential_savings_kg: float

# ============= Emission Calculation Engine =============

EMISSION_FACTORS = {
    "transport": {
        "car": 0.120,  # kg CO2e per km (average car)
        "electric_car": 0.025,
        "public_transport": 0.041,
        "flight_domestic": 0.255,
        "flight_international": 0.195,
        "bike": 0,
    },
    "energy": {
        "electricity": 0.415,  # kg CO2e per kWh (global avg)
        "natural_gas": 2.04,  # kg CO2e per m3
        "heating_oil": 3.15,  # kg CO2e per liter
    },
    "food": {
        "meat_beef": 27.0,  # kg CO2e per kg
        "meat_chicken": 6.9,
        "meat_pork": 12.1,
        "dairy": 1.23,  # kg CO2e per kg
        "vegetables": 0.22,
        "grains": 0.16,
    },
    "consumption": {
        "clothing": 7.0,  # kg CO2e per item
        "electronics": 85.0,  # kg CO2e per item
        "furniture": 30.0,
    }
}

def calculate_emissions(category: str, subcategory: str, value: float) -> float:
    """Calculate CO2e emissions for an activity"""
    if category in EMISSION_FACTORS and subcategory in EMISSION_FACTORS[category]:
        factor = EMISSION_FACTORS[category][subcategory]
        return value * factor
    return 0.0

# ============= Routes =============

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

# Auth endpoints
@app.post("/auth/register", response_model=TokenResponse)
async def register(user: UserRegister):
    """Register a new user (mock implementation)"""
    # In production, this would hash the password and save to database
    # For now, we generate a token
    payload = {
        "sub": user.email,
        "email": user.email,
        "full_name": user.full_name,
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return TokenResponse(access_token=token)

@app.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login user (mock implementation)"""
    # In production, verify password hash from database
    payload = {
        "sub": credentials.email,
        "email": credentials.email,
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return TokenResponse(access_token=token)

@app.post("/auth/verify")
async def verify_token(credentials: HTTPAuthCredential = Depends(security)):
    """Verify JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return {"valid": True, "user": payload.get("email")}
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# Activity endpoints
@app.post("/activities", response_model=ActivityResponse)
async def create_activity(activity: ActivityLog, credentials: HTTPAuthCredential = Depends(security)):
    """Log a carbon activity"""
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    emissions = calculate_emissions(activity.category, activity.subcategory, activity.value)
    
    # Mock ID generation
    import uuid
    activity_id = str(uuid.uuid4())
    
    return ActivityResponse(
        id=activity_id,
        user_id=activity.user_id,
        category=activity.category,
        subcategory=activity.subcategory,
        value=activity.value,
        unit=activity.unit,
        date=activity.date,
        notes=activity.notes,
        emissions_kg_co2e=emissions,
        created_at=datetime.now()
    )

@app.get("/activities/{user_id}", response_model=List[ActivityResponse])
async def get_activities(user_id: str, credentials: HTTPAuthCredential = Depends(security)):
    """Get user's activity logs"""
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Mock data
    return []

@app.get("/dashboard/{user_id}", response_model=DashboardStats)
async def get_dashboard_stats(user_id: str, credentials: HTTPAuthCredential = Depends(security)):
    """Get dashboard statistics for a user"""
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Mock data
    return DashboardStats(
        total_emissions_month=125.5,
        total_emissions_year=1205.3,
        daily_average=4.2,
        top_categories=[
            {"category": "transport", "emissions": 65.2},
            {"category": "energy", "emissions": 42.1},
            {"category": "food", "emissions": 18.2}
        ],
        trend="down"
    )

@app.get("/insights/{user_id}", response_model=List[InsightResponse])
async def get_insights(user_id: str, credentials: HTTPAuthCredential = Depends(security)):
    """Get AI-powered insights (mock)"""
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    
    # Mock insights
    return [
        InsightResponse(
            title="Switch to Public Transport",
            description="Your car commute accounts for 45% of your weekly emissions",
            recommendation="Consider taking the bus or train for your daily commute",
            potential_savings_kg=12.5
        ),
        InsightResponse(
            title="Reduce Energy Consumption",
            description="Your electricity usage is above average for your region",
            recommendation="Try using LED bulbs and setting thermostat to 20°C",
            potential_savings_kg=8.3
        )
    ]

@app.get("/emissions-factors")
async def get_emission_factors():
    """Get available emission factors for calculation"""
    return EMISSION_FACTORS

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
