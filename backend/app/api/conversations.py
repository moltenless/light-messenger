from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.core.deps import get_db, require_auth
from app.db.models.user import User
from app.repository import conversations
from app.core.dto import UserConversationOut
from app.repository import users

router = APIRouter(prefix='/conversations', tags=["conversations"])

@router.get("")
def get_conversations(
    db: Session = Depends(get_db), 
    user: User = Depends(require_auth)
):
    source_conversations = conversations.get_conversations(db, user.id)
    
    conversations_out = [
        UserConversationOut(
            id=conv.id,
            username=users.get_user(
                conv.user2_id if conv.user1_id == user.id else conv.user1_id
            ).username,
            created_at=conv.created_at
        )
        for conv in source_conversations
    ]
    
    return conversations_out

# @router.get("/{id}")
# def get_conversation(
#     id: str,
#     db: Session = Depends(get_db),
#     user: User = Depends(require_auth)
# ):
#     conv = conversations.get_conversation(id, db)
#     #convert to dto and return 