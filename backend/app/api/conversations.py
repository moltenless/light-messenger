from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.core.deps import get_db, require_auth
from app.db.models.user import User
from app.repository import conversations


router = APIRouter(prefix='/conversations', tags=["conversations"])

@router.get()
def get_conversations(
    db: Session = Depends(get_db), 
    user: User = Depends(require_auth)
):
    return conversations.get_conversations(db, user)