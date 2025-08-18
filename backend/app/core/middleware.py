from starlette.middleware.base import BaseHTTPMiddleware
from app.api.auth import oauth2_scheme
from app.core.config import settings
from fastapi import Request
from jose import jwt

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            token = await oauth2_scheme(request)
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
            user_id = payload.get('sub')
            request.state.user_id = user_id
        except:
            request.state.user_id = None
        
        response = await call_next(request)
        return response