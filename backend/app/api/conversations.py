from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Response, status
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
            id=str(convo.id),
            username=users.get_user(
                db,
                convo.user2_id if convo.user1_id == user.id else convo.user1_id
            ).username,
            created_at=convo.created_at
        )
        for convo in source_conversations
    ]
    
    return conversations_out

@router.post("/{user2_id}")
def get_or_create_conversation(
    user2_id: str,
    response: Response,
    db: Session = Depends(get_db),
    user1: User = Depends(require_auth)
):
    convo = conversations.get_conversation_by_usernames(user1.id, user2_id, db)
    if convo:
        response.status_code = status.HTTP_200_OK
        return convo.id
    
    convo = conversations.create_conversation(user1.id, user2_id, db)
    response.status_code = status.HTTP_201_CREATED
    return convo.id
    