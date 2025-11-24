Write-Host "Building all JAR files..."

Set-Location -Path "backend"

Write-Host "Building Auth Service..."
Set-Location -Path "auth-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean auth-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Flight Service..."
Set-Location -Path "flight-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean flight-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Seat Service..."
Set-Location -Path "seat-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean seat-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Booking Service..."
Set-Location -Path "booking-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean booking-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Payment Service..."
Set-Location -Path "payment-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean payment-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Currency Service..."
Set-Location -Path "currency-service"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean currency-service, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building API Gateway..."
Set-Location -Path "api-gateway"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean api-gateway, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "Building Eureka Server..."
Set-Location -Path "eureka-server"
# Try to clean first, but continue even if it fails
try {
    mvn clean -DskipTests
} catch {
    Write-Host "Warning: Could not clean eureka-server, continuing..."
}
mvn package -DskipTests
Set-Location -Path ".."

Write-Host "All JAR files built successfully!"