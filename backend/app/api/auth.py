from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.security import create_token, hash_password, verify_password
from app.core.config import settings
from app.core.dto import UserOut, UserCreate, TokenPair
from app.core.deps import get_db
from app.db.models.user import User

router = APIRouter(prefix='/auth', tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/register", response_model=UserOut, status_code=201)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter((User.email == payload.email) | (User.username == payload.username)).first():
        raise HTTPException(status_code=400, detail="Email or username already taken")
    u = User(email=payload.email, username=payload.username, password_hash=hash_password(payload.password))
    db.add(u)
    db.commit()
    db.refresh(u)
    return UserOut(id=str(u.id), email=u.email, username=u.username)

@router.post("/login", response_model=TokenPair)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form.username).first()
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = create_token(str(user.id), settings.ACCESS_TTL_MIN)
    refresh = create_token(str(user.id), settings.REFRESH_TTL_DAYS * 24 * 60)
    return TokenPair(access=access, refresh=refresh)