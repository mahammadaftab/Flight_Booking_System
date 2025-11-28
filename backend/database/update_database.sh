#!/bin/bash

# Script to update the Flight Booking System database with world flights data

echo "Updating Flight Booking System database with world flights data..."

# Check if the database directory exists
if [ ! -d "../database" ]; then
    echo "Error: Database directory not found!"
    exit 1
fi

# Navigate to the database directory
cd ../database

# Check if the world_flights.sql file exists
if [ ! -f "world_flights.sql" ]; then
    echo "Error: world_flights.sql file not found!"
    exit 1
fi

# Check if H2 database is running
echo "Checking if H2 database is accessible..."

# Try to connect to the H2 database
# Note: This is a simplified check. In a real scenario, you would need to check the actual database connection
echo "Attempting to update database with world flights data..."

# For now, we'll just print what would be done
echo "The following operations would be performed:"
echo "1. Connect to the H2 database"
echo "2. Execute world_flights.sql to add airports, flights, seats, and exchange rates"
echo "3. Verify the data was added successfully"

echo ""
echo "To manually update the database:"
echo "1. Start the backend services (./start-services.sh)"
echo "2. Connect to the H2 console at http://localhost:8082/h2-console"
echo "3. Run the world_flights.sql script in the console"
echo ""
echo "Database update script completed!"