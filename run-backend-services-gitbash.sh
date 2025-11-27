#!/bin/bash

echo "Starting Flight Booking System Backend Services..."
echo

# Function to start a service and wait
start_service() {
    local service_name=$1
    local service_path=$2
    
    echo "Starting $service_name..."
    cd "$service_path" && mvn spring-boot:run &
    sleep 10
    cd ../../..
}

# Start Eureka Server
start_service "Eureka Server" "backend/eureka-server"

# Start API Gateway
start_service "API Gateway" "backend/api-gateway"

# Start Auth Service
echo "Starting Auth Service..."
cd backend/auth-service && mvn spring-boot:run &

# Start Flight Service
echo "Starting Flight Service..."
cd ../../flight-service && mvn spring-boot:run &

# Start Seat Service
echo "Starting Seat Service..."
cd ../../seat-service && mvn spring-boot:run &

# Start Booking Service
echo "Starting Booking Service..."
cd ../../booking-service && mvn spring-boot:run &

# Start Payment Service
echo "Starting Payment Service..."
cd ../../payment-service && mvn spring-boot:run &

# Start Currency Service
echo "Starting Currency Service..."
cd ../../currency-service && mvn spring-boot:run &

cd ../../..

echo
echo "All backend services started!"
echo "You can now start the frontend with: cd frontend && npm run dev"