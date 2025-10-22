# True North Trading Platform - Multi-Stage Dockerfile
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Backend Runtime
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    git \
    curl \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements with pinned versions
COPY backend/config/requirements-lock.txt ./requirements.txt

# Install Python dependencies with pinned versions (much faster resolution)
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy README for documentation
COPY README.md ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/package.json ./frontend/package.json
COPY --from=frontend-builder /app/frontend/package-lock.json ./frontend/package-lock.json
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules

# Create necessary directories
RUN mkdir -p backend/data backend/logs

# Expose ports
EXPOSE 8002 3002

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app
ENV NODE_ENV=production

# Health check for backend
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8002/health || exit 1

# Default command - run both backend and frontend
CMD ["sh", "-c", "python backend/scripts/runners/run_backend.py & cd frontend && npm start -- --port 3002"]

