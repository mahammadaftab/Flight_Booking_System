#!/bin/bash

echo "Checking Flight Booking System Services..."
echo

# Function to check if a service is running on a port using PowerShell
check_port() {
    local service_name=$1
    local port=$2
    
    # Use PowerShell to check if the port is listening
    if powershell -Command "Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Where-Object { \$_.State -eq 'Listen' } | Measure-Object | Select-Object -ExpandProperty Count" | grep -q "1"; then
        echo "✓ $service_name is running on port $port"
    else
        echo "✗ $service_name is not running on port $port"
    fi
}

# Check if PowerShell is available
if command -v powershell &> /dev/null; then
    echo "Using PowerShell to check service status..."
    check_port "Eureka Server" 8761
    check_port "API Gateway" 8080
    check_port "Auth Service" 8081
    check_port "Flight Service" 8082
    check_port "Seat Service" 8083
    check_port "Booking Service" 8084
    check_port "Payment Service" 8085
    check_port "Currency Service" 8086
else
    echo "PowerShell not found. Cannot check service status."
    echo "Please check manually or install PowerShell."
fi