from app.db.models.user import User
from sqlalchemy.orm import Session
from app.core.dto import UserCreate
from app.core.security import hash_password

def get_user(db: Session, id: str) -> User | None:
    return db.get(User, id)

def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()
    
def get_filtered_users(db: Session, username_substring: str, limit: int) -> list[User] | None:
    ilike_query = f"%{username_substring}%"
    return db.query(User).filter(User.username.ilike(ilike_query)).limit(limit).all()

def credentials_taken(db: Session, new_user: UserCreate) -> bool:
    return db.query(User).filter((User.email == new_user.email) | (User.username == new_user.username)).first()

def create_user(db: Session, new_user: UserCreate) -> User | None:
    user = User(email=new_user.email, username=new_user.username, password_hash=hash_password(new_user.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db: Session) -> list[User] | None:
    return db.query(User).all()