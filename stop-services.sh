#!/bin/bash

echo "Stopping Flight Booking System Backend Services..."
echo

# Kill all Java processes
echo "Killing all Java processes..."
pkill -f "java.*spring-boot" 2>/dev/null || killall java 2>/dev/null || taskkill //f //im java.exe 2>/dev/null

echo "All services stopped!"