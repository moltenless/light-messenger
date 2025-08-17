from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app.core.security import create_token, hash_password, verify_password
from app.core.config import settings
from app.db.session import SessionLocal
from app.db.models.user import User

router = APIRouter(prefix='/auth', tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    
class TokenPair(BaseModel):
    access: str
    refresh: str
    
class UserOut(BaseModel):
    id: str
    email: EmailStr
    username: str
    

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
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

class TokenData(BaseModel):
    sub: str
    
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.get("/me", response_model=UserOut)
def me(current: User = Depends(get_current_user)):
    return UserOut(id=str(current.id), email=current.email, username=current.username)