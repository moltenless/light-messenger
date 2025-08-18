from fastapi import Depends, HTTPException, Request
from app.db.session import SessionLocal
from sqlalchemy.orm import Session
from backend.app.repository import users

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