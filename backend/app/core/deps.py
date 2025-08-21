from fastapi import Depends, HTTPException, Request
from app.db.session import SessionLocal
from sqlalchemy.orm import Session
from app.repository import users
from jose import jwt
from app.core.config import settings

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def require_auth(request: Request, session: Session = Depends(get_db)):
    if not request.state.user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user = users.get_user(session, request.state.user_id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

async def get_user_from_token(token: str): 
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        user_id = payload.get('sub')
    except:
        return None
    
    if not user_id:
        return None
    
    db = SessionLocal()
    user = users.get_user(db, user_id)
    db.close()
    return user
    