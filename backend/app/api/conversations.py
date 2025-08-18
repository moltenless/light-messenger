

from fastapi import APIRouter


router = APIRouter(prefix='/conversations', tags=["conversations"])

# @router.get(response_class=)