from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.db.models.conversation import Conversation

def get_conversations(db: Session, user_id: int) -> list[Conversation] | None: 
    return db.query(Conversation).filter((Conversation.user1_id == user_id) | (Conversation.user2_id == user_id)).all()

def get_conversation_by_usernames(user1_id: str, user2_id: str, db: Session) -> Conversation | None:
    convo = db.query(Conversation).filter(
        or_(
          (Conversation.user1_id == user1_id) & (Conversation.user2_id == user2_id),
          (Conversation.user2_id == user1_id) & (Conversation.user1_id == user2_id)  
        )
    ).first()
    return convo

def create_conversation(user1_id: str, user2_id: str, db: Session) -> Conversation | None:
    convo = Conversation(user1_id=user1_id, user2_id=user2_id)
    db.add(convo)
    db.commit()
    db.refresh(convo)
    return convo