Write-Host "Starting Flight Booking System Backend Services..." -ForegroundColor Green
Write-Host ""

# Start Eureka Server
Write-Host "Starting Eureka Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\eureka-server'; mvn spring-boot:run" -WindowStyle Normal

Start-Sleep -Seconds 10

# Start API Gateway
Write-Host "Starting API Gateway..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\api-gateway'; mvn spring-boot:run" -WindowStyle Normal

Start-Sleep -Seconds 10

# Start Auth Service
Write-Host "Starting Auth Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\auth-service'; mvn spring-boot:run" -WindowStyle Normal

# Start Flight Service
Write-Host "Starting Flight Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\flight-service'; mvn spring-boot:run" -WindowStyle Normal

# Start Seat Service
Write-Host "Starting Seat Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\seat-service'; mvn spring-boot:run" -WindowStyle Normal

# Start Booking Service
Write-Host "Starting Booking Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\booking-service'; mvn spring-boot:run" -WindowStyle Normal

# Start Payment Service
Write-Host "Starting Payment Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\payment-service'; mvn spring-boot:run" -WindowStyle Normal

# Start Currency Service
Write-Host "Starting Currency Service..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'backend\currency-service'; mvn spring-boot:run" -WindowStyle Normal

Write-Host ""
Write-Host "All backend services started!" -ForegroundColor Green
Write-Host "You can now start the frontend with: cd frontend && npm run dev" -ForegroundColor Cyan