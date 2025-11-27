# Docker Removal Summary

This document summarizes the changes made to remove Docker from the Flight Booking System project and enable running the backend services with a single command.

## Changes Made

### 1. Removed Docker Files
- Deleted `docker-compose.yml`
- Deleted `docker-compose-prebuilt.yml`
- Removed Dockerfile from each service directory:
  - `backend/api-gateway/Dockerfile`
  - `backend/auth-service/Dockerfile`
  - `backend/booking-service/Dockerfile`
  - `backend/currency-service/Dockerfile`
  - `backend/eureka-server/Dockerfile`
  - `backend/flight-service/Dockerfile`
  - `backend/payment-service/Dockerfile`
  - `backend/seat-service/Dockerfile`
  - `backend/base/Dockerfile`
- Removed Docker-related files from monitoring directory:
  - `monitoring/docker-compose.monitoring.yml`

### 2. Created Backend Service Startup Scripts
- Created `run-backend-services.bat` - Windows batch script to start all backend services
- Created `run-backend-services.ps1` - PowerShell script to start all backend services

### 3. Updated Documentation
- Completely replaced `README.md` with a Docker-free version
- Removed all Docker references from the documentation
- Updated instructions to use the new startup scripts
- Updated project structure diagram to remove Docker files

## How to Run the Application

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- Git

### Running the Backend Services
On Windows, you can start all backend services with a single command:

```bash
# Using the batch script
run-backend-services.bat

# Or using the PowerShell script
run-backend-services.ps1
```

On Unix/Linux/MacOS, you can start services individually:

```bash
cd backend/eureka-server
mvn spring-boot:run

cd backend/api-gateway
mvn spring-boot:run

# ... and so on for each service
```

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

## Benefits of This Approach

1. **Simplified Setup**: No need to install Docker Desktop or manage containers
2. **Faster Development**: Direct JVM execution is faster than containerized execution
3. **Easier Debugging**: Can easily attach debuggers to individual services
4. **Reduced Resource Usage**: No overhead from containerization
5. **Better IDE Integration**: Direct Maven integration with IDEs

## Services Overview

When starting the system using the provided scripts or manual commands, all services should start successfully:

1. **Frontend** - React application serving the user interface on port 3000
2. **PostgreSQL** - Database service on port 5432 (when running with Docker)
3. **Redis** - Caching and seat locking service on port 6379 (when running with Docker)

Note: For local development, services use in-memory H2 databases by default, so PostgreSQL is not required. Redis is only needed for seat locking functionality.