# True North Trading Platform - Backend API Dockerfile
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

# Create necessary directories
RUN mkdir -p backend/data backend/logs

# Expose backend API port
EXPOSE 8002

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Health check for backend
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8002/health || exit 1

# Run backend API server
CMD ["python", "/app/backend/scripts/runners/run_backend.py"]

