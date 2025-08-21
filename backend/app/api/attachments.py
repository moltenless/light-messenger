import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.deps import get_db, require_auth
from app.db.models.user import User
from app.repository import attachments, messages, conversations

router = APIRouter(prefix='/attachments', tags=["attachments"])

@router.get("/{attachment_id}")
def get_attachment(
    attachment_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(require_auth)
):
    attachment = attachments.get_attachment(attachment_id, db)
    if not attachment:
        raise HTTPException(status_code=404, detail="The attachment not found")
    
    message = messages.get_message(attachment.message_id, db)
    if not message:
        raise HTTPException(status_code=404, detail="The message not found")
    
    conversation = conversations.get_conversation(message.conversation_id, db)
    if not conversation:
        raise HTTPException(status_code=404, detail="The conversation not found")
    
    if conversation.user1_id != user.id and conversation.user2_id != user.id:
        raise HTTPException(status_code=403, detail="You don't have access to this attachment")
    
    storage_path = attachment.storage_path
    if not os.path.exists(storage_path):
        raise HTTPException(status_code=410, detail="File no longer exists")
    
    return FileResponse(
        path=storage_path,
        filename=attachment.original_name,
        media_type=attachment.mime_type
    )