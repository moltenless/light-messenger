from fastapi import Depends, HTTPException, Request
from app.db.session import SessionLocal
from sqlalchemy.orm import Session
from app.db.models.user import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def require_user(request: Request, session: Session = Depends(get_db)):
    if not request.state.user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user = session.query(User).get(request.state.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user