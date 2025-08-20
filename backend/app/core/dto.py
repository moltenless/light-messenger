from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
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
    username: str
    created_at: datetime
    
class SendMessage(BaseModel):
    content: str