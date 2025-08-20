from fastapi import APIRouter, Depends, HTTPException
from app.repository import messages
from sqlalchemy.orm import Session
from app.core.deps import get_db, require_auth
from app.db.models.user import User
from app.repository import conversations
from app.core.dto import SendMessage, UpdateMessage

router = APIRouter(prefix='/messages', tags=["messages"])

@router.get("/{convo_id}")
def get_messages_thread(
    convo_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(require_auth)
):
    convo = conversations.get_conversation(convo_id, db)
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if convo.user1_id != user.id and convo.user2_id != user.id:
        raise HTTPException(status_code=403, detail="You don't have access to this conversation")
    
    return messages.get_messages_thread(convo.id, db)

@router.post("/{convo_id}", status_code=201)
def send_message(
    convo_id: str,
    payload: SendMessage,
    db: Session = Depends(get_db),
    user: User = Depends(require_auth)
): 
    convo = conversations.get_conversation(convo_id, db)
    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if convo.user1_id != user.id and convo.user2_id != user.id:
        raise HTTPException(status_code=403, detail="You don't have access to this conversation")
    
    message = messages.send_message(convo_id, user.id, payload.content, db)
    return message

@router.put("/{message_id}", status_code=204)
def update_message(
    message_id: str,
    payload: UpdateMessage,
    db: Session = Depends(get_db),
    user: User = Depends(require_auth)
):
    message = messages.get_message(message_id, db)
    
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if message.sender_id != user.id:
        raise HTTPException(status_code=403, detail="You don't have access to edit this message")
    
    messages.update_message(message, payload.content, db)
    
@router.delete("/{message_id}", status_code=204)
def delete_message(
    message_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(require_auth)
):
    message = messages.get_message(message_id, db)
    
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    if message.sender_id != user.id:
        raise HTTPException(status_code=403, detail="You don't have access to delete this message")
    
    messages.delete_message(message, db)