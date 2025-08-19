from sqlalchemy.orm import Session
from app.db.models.conversation import Conversation

def get_conversations(db: Session, user_id: int) -> list[Conversation] | None: 
    return db.query(Conversation).filter((Conversation.user1_id == user_id) | (Conversation.user2_id == user_id)).all()

def get_conversation(id: str, db: Session) -> Conversation | None:
    return db.get(Conversation, id)