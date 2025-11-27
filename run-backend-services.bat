@echo off
echo Starting Flight Booking System Backend Services...
echo.

echo Starting Eureka Server...
start "Eureka Server" cmd /k "cd backend\eureka-server && mvn spring-boot:run"
timeout /t 10 /nobreak >nul

echo Starting API Gateway...
start "API Gateway" cmd /k "cd backend\api-gateway && mvn spring-boot:run"
timeout /t 10 /nobreak >nul

echo Starting Auth Service...
start "Auth Service" cmd /k "cd backend\auth-service && mvn spring-boot:run"

echo Starting Flight Service...
start "Flight Service" cmd /k "cd backend\flight-service && mvn spring-boot:run"

echo Starting Seat Service...
start "Seat Service" cmd /k "cd backend\seat-service && mvn spring-boot:run"

echo Starting Booking Service...
start "Booking Service" cmd /k "cd backend\booking-service && mvn spring-boot:run"

echo Starting Payment Service...
start "Payment Service" cmd /k "cd backend\payment-service && mvn spring-boot:run"

echo Starting Currency Service...
start "Currency Service" cmd /k "cd backend\currency-service && mvn spring-boot:run"

echo.
echo All backend services started!
echo You can now start the frontend with: cd frontend && npm run dev
pause