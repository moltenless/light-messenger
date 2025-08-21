from typing import Dict, List
from fastapi import APIRouter, HTTPException, Query, WebSocket, WebSocketDisconnect
from app.core import deps
from app.repository import conversations

router = APIRouter(prefix="/ws")

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}
        
    async def connect(self, convo_id: str, websocket: WebSocket):
        await websocket.accept()
        if convo_id not in self.active_connections:
            self.active_connections[convo_id] = []
        self.active_connections[convo_id].append(websocket)
        
    def disconnect(self, convo_id: str, websocket: WebSocket):
        self.active_connections[convo_id].remove(websocket)
        if not self.active_connections[convo_id]:
            del self.active_connections[convo_id]
            
    async def broadcast(self, convo_id: str, message: dict):
        if convo_id in self.active_connections:
            for conn in self.active_connections[convo_id]:
                await conn.send_json(message)
                
manager = ConnectionManager()

@router.websocket("/conversations/{convo_id}")
async def websocket_endpoint(websocket: WebSocket, convo_id: str, token: str = Query(...)):
    user = await deps.get_user_from_token(token)
    if not user:
        await websocket.close(code=1008)
        return
    
    db = next(deps.get_db())
    try:
        convo = conversations.get_conversation(convo_id, db)
        if not convo or (convo.user1_id != user.id and convo.user2_id != user.id):
            await websocket.close(1008)
            return 
    finally:
        db.close()
    
    await manager.connect(convo_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(convo_id, {"event": "echo", "data": data})
    except WebSocketDisconnect:
        manager.disconnect(convo_id, websocket)