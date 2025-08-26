# light-messenger
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
