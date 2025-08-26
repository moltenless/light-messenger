# light-messenger
FastAPI + React: Tailwind framework, Alembic migrations for PostgreSQL database, Live messages update with WebSockets, Docker Compose for db, backend and frontend, JWT tokens, OAuth2 schemes, Middleware, CORS, states with Zustand
## Demonstration
https://github.com/user-attachments/assets/d573a997-6678-4706-bf41-ae50adf773c9


## Launch
```
docker compose up -d --build
```
## Run database migration with alembic (when running specify database password (from .env) with -x param)
```
alembic -x upgrade ....
```
## Run react frontend with Vite
```
npm run dev
```
