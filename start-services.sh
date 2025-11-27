#!/bin/bash

echo "Starting Flight Booking System Backend Services..."
echo

# Function to start a service and wait for it to be ready
start_service() {
    local service_name=$1
    local service_path=$2
    local port=$3
    
    echo "Starting $service_name..."
    cd "$service_path"
    
    # Start the service in the background
    mvn spring-boot:run > service.log 2>&1 &
    local pid=$!
    
    # Wait for the service to be ready
    echo "Waiting for $service_name to start on port $port..."
    while ! nc -z localhost $port; do
        sleep 1
    done
    
    echo "$service_name started successfully!"
    cd ../../..
    
    # Return the PID
    echo $pid
}

# Check if netcat is available
if ! command -v nc &> /dev/null; then
    echo "Warning: netcat (nc) not found. Will use timed delays instead."
    USE_NC=false
else
    USE_NC=true
fi

# Start Eureka Server (port 8761)
echo "Starting Eureka Server..."
cd backend/eureka-server
mvn spring-boot:run > eureka.log 2>&1 &
EUREKA_PID=$!
cd ../..
sleep 15  # Give Eureka server time to start

# Start API Gateway (port 8080)
echo "Starting API Gateway..."
cd backend/api-gateway
mvn spring-boot:run > gateway.log 2>&1 &
GATEWAY_PID=$!
cd ../..
sleep 10

# Start Auth Service (port 8081)
echo "Starting Auth Service..."
cd backend/auth-service
mvn spring-boot:run > auth.log 2>&1 &
AUTH_PID=$!
cd ../..

# Start Flight Service (port 8082)
echo "Starting Flight Service..."
cd backend/flight-service
mvn spring-boot:run > flight.log 2>&1 &
FLIGHT_PID=$!
cd ../..

# Start Seat Service (port 8083)
echo "Starting Seat Service..."
cd backend/seat-service
mvn spring-boot:run > seat.log 2>&1 &
SEAT_PID=$!
cd ../..

# Start Booking Service (port 8084)
echo "Starting Booking Service..."
cd backend/booking-service
mvn spring-boot:run > booking.log 2>&1 &
BOOKING_PID=$!
cd ../..

# Start Payment Service (port 8085)
echo "Starting Payment Service..."
cd backend/payment-service
mvn spring-boot:run > payment.log 2>&1 &
PAYMENT_PID=$!
cd ../..

# Start Currency Service (port 8086)
echo "Starting Currency Service..."
cd backend/currency-service
mvn spring-boot:run > currency.log 2>&1 &
CURRENCY_PID=$!
cd ../..

echo
echo "All backend services started!"
echo "Service PIDs:"
echo "  Eureka Server: $EUREKA_PID"
echo "  API Gateway: $GATEWAY_PID"
echo "  Auth Service: $AUTH_PID"
echo "  Flight Service: $FLIGHT_PID"
echo "  Seat Service: $SEAT_PID"
echo "  Booking Service: $BOOKING_PID"
echo "  Payment Service: $PAYMENT_PID"
echo "  Currency Service: $CURRENCY_PID"
echo
echo "You can now start the frontend with: cd frontend && npm run dev"
echo "To stop all services, run: ./stop-services.sh"