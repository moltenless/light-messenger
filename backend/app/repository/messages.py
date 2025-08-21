from sqlalchemy.orm import Session, joinedload
from app.db.models.message import Message

def get_messages_thread(convo_id: str, db: Session) -> list[Message] | None:
    return (
        db.query(Message)
        .options(joinedload(Message.attachments))
        .filter(Message.conversation_id == convo_id)
        .order_by(Message.created_at.desc())
        .all()
    )
    
def send_message(convo_id: str, sender_id: str, content: str, db: Session) -> Message | None:
    message = Message(conversation_id=convo_id, sender_id=sender_id, content=content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

def get_message(id: str, db: Session) -> Message | None:
    return db.get(Message, id)

def update_message(message: Message, content: str, db: Session) -> None:
    message.content = content
    db.commit()
    db.refresh(message)
    
def delete_message(message: Message, db: Session) -> None:
    db.delete(message)
    db.commit()