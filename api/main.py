"""
CarbonIQ Backend API - FastAPI server for emission calculation and data management
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
import os
from functools import lru_cache

# Initialize FastAPI
app = FastAPI(title="CarbonIQ API", version="1.0.0")

# CORS Configuration - restrict to deployed frontend origin
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
CORS_ORIGINS = [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Security
security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret-key-change-in-production")
ALGORITHM = "HS256"

# ============= Models =============

class UserRegister(BaseModel):
    """User registration model with validation"""
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters")
    full_name: str = Field(..., min_length=1, max_length=255, description="Full name is required")
    
    @validator('password')
    def validate_password(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one digit')
        return v

class UserLogin(BaseModel):
    """User login model with validation"""
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    """Token response model"""
    access_token: str
    token_type: str = "bearer"

class ActivityLog(BaseModel):
    """Activity logging model with input validation"""
    user_id: str = Field(..., min_length=1, description="User ID is required")
    category: str = Field(..., min_length=1, description="Category is required")
    subcategory: str = Field(..., min_length=1, description="Subcategory is required")
    value: float = Field(..., gt=0, description="Value must be greater than 0")
    unit: str = Field(..., min_length=1, max_length=50, description="Unit is required")
    date: datetime
    notes: Optional[str] = Field(None, max_length=500, description="Optional notes up to 500 characters")
    
    @validator('category')
    def validate_category(cls, v):
        valid_categories = ["transport", "energy", "food", "consumption"]
        if v not in valid_categories:
            raise ValueError(f"Invalid category. Must be one of: {', '.join(valid_categories)}")
        return v

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
    """
    Calculate CO2e emissions for an activity.
    
    Args:
        category: Activity category (transport, energy, food, consumption)
        subcategory: Specific activity type within category
        value: Quantity of activity
        
    Returns:
        float: Calculated emissions in kg CO2e
        
    Raises:
        ValueError: If category or subcategory is invalid
    """
    if category not in EMISSION_FACTORS:
        raise ValueError(f"Invalid category: {category}")
    if subcategory not in EMISSION_FACTORS[category]:
        raise ValueError(f"Invalid subcategory: {subcategory} for category {category}")
    
    factor = EMISSION_FACTORS[category][subcategory]
    return value * factor

# ============= Routes =============

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

# Auth endpoints
@app.post("/auth/register", response_model=TokenResponse)
async def register(user: UserRegister):
    """
    Register a new user.
    
    Args:
        user: User registration data with email, password, and full_name
        
    Returns:
        TokenResponse: JWT token for authenticated session
        
    Raises:
        HTTPException: 400 if validation fails, 500 if token generation fails
    """
    try:
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
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate authentication token"
        )

@app.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """
    Authenticate user and return JWT token.
    
    Args:
        credentials: User login credentials (email and password)
        
    Returns:
        TokenResponse: JWT token for authenticated session
        
    Raises:
        HTTPException: 401 if credentials invalid, 500 if token generation fails
    """
    try:
        # In production, verify password hash from database
        payload = {
            "sub": credentials.email,
            "email": credentials.email,
            "exp": datetime.utcnow() + timedelta(days=30)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return TokenResponse(access_token=token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication failed"
        )

@app.post("/auth/verify")
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify JWT token validity.
    
    Args:
        credentials: Bearer token from Authorization header
        
    Returns:
        dict: Verification status and user email if valid
        
    Raises:
        HTTPException: 401 if token is invalid or expired
    """
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return {"valid": True, "user": payload.get("email")}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# Activity endpoints
@app.post("/activities", response_model=ActivityResponse)
async def create_activity(activity: ActivityLog, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Log a new carbon emission activity.
    
    Args:
        activity: Activity data with category, subcategory, value, and unit
        credentials: Valid JWT token from Authorization header
        
    Returns:
        ActivityResponse: Created activity with calculated emissions
        
    Raises:
        HTTPException: 401 if unauthorized, 400 if validation fails, 500 if calculation fails
    """
    try:
        # Verify authentication
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    
    try:
        # Calculate emissions
        emissions = calculate_emissions(activity.category, activity.subcategory, activity.value)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to calculate emissions"
        )
    
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
async def get_activities(user_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Retrieve all activities for a user.
    
    Args:
        user_id: ID of user to retrieve activities for
        credentials: Valid JWT token from Authorization header
        
    Returns:
        List[ActivityResponse]: List of user's activities
        
    Raises:
        HTTPException: 401 if unauthorized, 404 if user not found
    """
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    
    # Mock data
    return []

@app.get("/dashboard/{user_id}", response_model=DashboardStats)
async def get_dashboard_stats(user_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get dashboard statistics and summary for a user.
    
    Args:
        user_id: ID of user to retrieve dashboard for
        credentials: Valid JWT token from Authorization header
        
    Returns:
        DashboardStats: User's emissions statistics and trends
        
    Raises:
        HTTPException: 401 if unauthorized, 404 if user not found
    """
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    
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
async def get_insights(user_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get AI-powered personalized insights for emissions reduction.
    
    Args:
        user_id: ID of user to generate insights for
        credentials: Valid JWT token from Authorization header
        
    Returns:
        List[InsightResponse]: Personalized recommendations for emission reduction
        
    Raises:
        HTTPException: 401 if unauthorized, 404 if user not found
    """
    try:
        jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    
    # Mock insights - In production, use Google Vertex AI for generation
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
    """
    Get available emission factors for all categories and subcategories.
    
    Returns:
        dict: Dictionary mapping categories to subcategories and their emission factors (kg CO2e)
    """
    return EMISSION_FACTORS

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
