from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.api.auth import get_db
from app.db.models.user import User
from app.core.dto import UserOut
from app.core.deps import require_auth
from app.repository import users

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
def me(user: User = Depends(require_auth)):
    return UserOut(id=str(user.id), email=user.email, username=user.username)

@router.get("/search")
def search_users(q: str = Query(..., min_length=1), db: Session = Depends(get_db), _: User = Depends(require_auth)):
    return users.get_filtered_users(db, q, 100)
