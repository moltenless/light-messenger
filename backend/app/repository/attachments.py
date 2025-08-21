import os
import shutil
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.db.models.attachment import Attachment

UPLOAD_DIR = "/app/uploads"

def create_attachment(file: UploadFile, message_id: str, db: Session) -> Attachment | None:
    file_id = str(uuid.uuid4())
    extension = os.path.splitext(file.filename)[1]
    storage_name = f"{file_id}{extension}"
    storage_path = os.path.join(UPLOAD_DIR, storage_name)
    
    with open(storage_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    attachment = Attachment(
        message_id=message_id,
        original_name=file.filename,
        mime_type=file.content_type,
        size_bytes=file.size if hasattr(file, "size") else None,
        storage_path=storage_path
    )
    db.add(attachment)
    db.commit()
    db.refresh(attachment)
    return attachment

def get_attachment(id: str, db: Session) -> Attachment | None:
    return db.get(Attachment, id)