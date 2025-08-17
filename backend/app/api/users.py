from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.api.auth import get_current_user, get_db
from app.db.models.user import User


router = APIRouter(prefix="/users", tags=["users"])

@router.get("/search")
def search_users(q: str = Query(..., min_length=1), db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    qlike = f"%{q}%"
    rows = db.query(User).filter(User.username.ilike(qlike)).limit(20).all()
    return [{"id": str(u.id), "username": u.username} for u in rows]
