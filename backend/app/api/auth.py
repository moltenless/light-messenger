from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.security import create_token, verify_password
from app.core.config import settings
from app.core.dto import AuthResponse, UserCreate, TokenPair, UserOut
from app.core.deps import get_db
from app.repository import users

router = APIRouter(prefix='/auth', tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/register", response_model=AuthResponse, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if users.credentials_taken(db, payload):
        raise HTTPException(status_code=400, detail="Email or username already taken")
    
    user = users.create_user(db, payload)
    access = create_token(str(user.id), settings.ACCESS_TTL_MIN)
    refresh = create_token(str(user.id), settings.REFRESH_TTL_DAYS * 24 * 60)
    
    return AuthResponse(
        user=user,
        tokens=TokenPair(access=access, refresh=refresh)
    )

@router.post("/login", response_model=AuthResponse)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = users.get_user_by_username(db, form.username)
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )
    
    access = create_token(str(user.id), settings.ACCESS_TTL_MIN)
    refresh = create_token(str(user.id), settings.REFRESH_TTL_DAYS * 24 * 60)
    
    return AuthResponse(
        user=UserOut(id=str(user.id), email=user.email, username=user.username, created_at=user.created_at),
        tokens=TokenPair(access=access, refresh=refresh)
    )