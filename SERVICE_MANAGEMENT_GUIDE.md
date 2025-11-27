# Service Management Guide

This document explains how to manage the Flight Booking System backend services using the provided scripts.

## Available Scripts

### 1. start-services.sh
Starts all backend services in the correct order:
1. Eureka Server (port 8761)
2. API Gateway (port 8080)
3. Auth Service (port 8081)
4. Flight Service (port 8082)
5. Seat Service (port 8083)
6. Booking Service (port 8084)
7. Payment Service (port 8085)
8. Currency Service (port 8086)

### 2. stop-services.sh
Stops all running backend services by killing Java processes.

### 3. check-services.sh
Checks if services are running on their respective ports.

## Usage Instructions

### Starting Services
```bash
./start-services.sh
```

This script will:
1. Start each service in the correct order
2. Wait for each service to initialize before starting the next
3. Display the process IDs (PIDs) of all started services
4. Show instructions for starting the frontend

### Stopping Services
```bash
./stop-services.sh
```

This script will:
1. Kill all Java processes related to the services
2. Confirm when all services have been stopped

### Checking Service Status
```bash
./check-services.sh
```

This script will:
1. Check if each service is running on its designated port
2. Display the status of each service (running/not running)

## Service Ports

| Service         | Port  |
|----------------|-------|
| Eureka Server   | 8761  |
| API Gateway     | 8080  |
| Auth Service    | 8081  |
| Flight Service  | 8082  |
| Seat Service    | 8083  |
| Booking Service | 8084  |
| Payment Service | 8085  |
| Currency Service| 8086  |

## Prerequisites

1. **Maven**: Ensure Maven is installed and available in your PATH
2. **Java 17**: Ensure Java 17 is installed and configured
3. **Netcat** (optional): For better service status checking

## Troubleshooting

### Services Not Starting
1. Check if the required ports are already in use:
   ```bash
   netstat -an | grep :8080
   ```
2. Stop any processes using the required ports
3. Ensure Maven and Java are properly installed

### Services Not Responding
1. Check the log files in each service directory:
   - `backend/eureka-server/eureka.log`
   - `backend/api-gateway/gateway.log`
   - etc.
2. Look for error messages in the logs
3. Verify all dependencies are correctly configured

### Frontend Issues
After starting the backend services, start the frontend:
```bash
cd frontend
npm run dev
```

## Manual Service Management

If you prefer to start services manually:

1. **Start Eureka Server**:
   ```bash
   cd backend/eureka-server
   mvn spring-boot:run
   ```

2. **Start API Gateway** (after Eureka is ready):
   ```bash
   cd backend/api-gateway
   mvn spring-boot:run
   ```

3. **Start Other Services** (in any order after Eureka and Gateway are ready):
   ```bash
   cd backend/auth-service
   mvn spring-boot:run
   
   cd backend/flight-service
   mvn spring-boot:run
   
   # Continue with other services...
   ```

## Best Practices

1. **Always start Eureka Server first** - Other services depend on it for service discovery
2. **Start API Gateway second** - It routes requests to other services
3. **Allow time for each service to initialize** before starting dependent services
4. **Check logs** if services fail to start or behave unexpectedly
5. **Stop services in reverse order** when shutting down manually
6. **Use the provided scripts** for easier management