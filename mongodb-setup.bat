@echo off
echo Setting up MongoDB for Flight Booking System...
echo.

REM Check if MongoDB is installed
echo Checking if MongoDB is installed...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB is not installed or not in PATH.
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)

echo MongoDB is installed.

REM Start MongoDB service
echo Starting MongoDB service...
net start MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo Failed to start MongoDB service. Trying to start mongod manually...
    start "MongoDB" cmd /k "mongod --dbpath C:\data\db"
    timeout /t 5 /nobreak >nul
)

REM Create database and collections
echo Creating flightbooking database and collections...
mongo flightbooking --eval "db.createCollection('users')"
mongo flightbooking --eval "db.createCollection('countries')"
mongo flightbooking --eval "db.createCollection('states')"
mongo flightbooking --eval "db.createCollection('airports')"
mongo flightbooking --eval "db.createCollection('flights')"
mongo flightbooking --eval "db.createCollection('seats')"
mongo flightbooking --eval "db.createCollection('seatLocks')"
mongo flightbooking --eval "db.createCollection('bookings')"
mongo flightbooking --eval "db.createCollection('bookingSeats')"
mongo flightbooking --eval "db.createCollection('payments')"
mongo flightbooking --eval "db.createCollection('exchangeRates')"
mongo flightbooking --eval "db.createCollection('aircraftLayouts')"

REM Create indexes
echo Creating indexes...
mongo flightbooking --eval "db.users.createIndex({email: 1}, {unique: true})"
mongo flightbooking --eval "db.flights.createIndex({origin: 1, destination: 1, departureUtc: 1})"
mongo flightbooking --eval "db.bookings.createIndex({pnr: 1})"
mongo flightbooking --eval "db.seatLocks.createIndex({lockExpiry: 1})"
mongo flightbooking --eval "db.seats.createIndex({flightId: 1})"

echo MongoDB setup completed successfully!
echo You can now run the Flight Booking System with MongoDB.
pause