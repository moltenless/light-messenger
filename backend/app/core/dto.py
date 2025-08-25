from datetime import datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr
from app.db.models.message import Message

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    
class UserLogin(BaseModel):
    username: str
    password: str
    
class TokenPair(BaseModel):
    access: str
    refresh: str
    
class UserOut(BaseModel):
    id: str
    email: EmailStr
    username: str
    created_at: datetime
    
class AuthResponse(BaseModel):
    user: UserOut
    tokens: TokenPair
    
class UserShortInfo(BaseModel):
    id: str
    username: str
    
class UserConversationOut(BaseModel):
    id: str
    user2_id: str
    username: str
    email: str
    created_at: datetime
    
class SendMessage(BaseModel):
    content: str
    
class UpdateMessage(BaseModel):
    content: str
    
class AttachmentTransfer(BaseModel):
    id: UUID
    message_id: UUID
    original_name: Optional[str]
    mime_type: Optional[str]
    size_bytes: Optional[int]
    storage_path: str
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }

class MessageTransfer(BaseModel):
    id: UUID
    conversation_id: UUID
    sender_id: UUID
    content: Optional[str]
    created_at: datetime
    edited_at: Optional[datetime]
    deleted_at: Optional[datetime]
    
    attachments: List[AttachmentTransfer] = []
    
    model_config = {
        "from_attributes": True
    }
    
class MessageThreadOut(BaseModel):
    messages: List[MessageTransfer] = []
    username: str
    
    model_config = {
        "from_attributes": True
    }