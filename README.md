# Up-Side-Vogue

Up-Side-Vogue is a modern, production-style e-commerce microservices application for a high-fashion clothing brand. It features Node.js backend services, a React frontend with a minimalistic black/white/gold theme, and an NGINX-based API Gateway.

## Architecture Overview

Services:
- Auth Service (Node.js + Express + MongoDB)
- Product Service (Node.js + Express + MongoDB)
- Order Service (Node.js + Express + PostgreSQL)
- Frontend (React, built and served via NGINX)
- API Gateway (NGINX reverse proxy)

Databases:
- MongoDB for auth-service (authdb)
- MongoDB for product-service (productdb)
- PostgreSQL for order-service (orderdb)

## API Gateway Routing

- `/api/auth/` → `auth-service:5001`
- `/api/products/` → `product-service:5002`
- `/api/orders/` → `order-service:5003`
- `/` → `frontend-service`

## Environment Variables

Auth Service:
- `PORT=5001`
- `MONGO_URI=mongodb://mongo-auth:27017/authdb`
- `JWT_SECRET=supersecretjwt`

Product Service:
- `PORT=5002`
- `MONGO_URI=mongodb://mongo-product:27017/productdb`
- `JWT_SECRET=supersecretjwt`

Order Service:
- `PORT=5003`
- `POSTGRES_URI=postgresql://order_user:order_pass@postgres-order:5432/orderdb`
- `JWT_SECRET=supersecretjwt`

## How to Run (Docker Compose)

1. Ensure Docker and Docker Compose are installed.
2. In the project root, run:

```bash
docker-compose build
docker-compose up -d
```

3. Open the application at: `http://localhost:8080`

## Service Health Endpoints

Each backend service exposes a `/health` endpoint for basic health checks.

## Frontend

- Built with React, React Router for client-side routing, Axios for API calls, and a global auth context with JWT storage.
- UI theme: Minimalistic, High-fashion style, colors Black/White with Gold accents and elegant typography.

## Testing

Each backend service includes at least one Jest test located under `/tests/*`.

## Notes

- All backend services use Node 18 Alpine images and install only production dependencies in Docker.
- Frontend is built in a multi-stage Dockerfile and served by NGINX.