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
    
class TokenData(BaseModel):
    sub: str