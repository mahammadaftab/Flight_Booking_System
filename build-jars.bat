@echo off
echo Building all JAR files...

cd backend

echo Building Auth Service...
cd auth-service
call mvn clean package -DskipTests
cd ..

echo Building Flight Service...
cd flight-service
call mvn clean package -DskipTests
cd ..

echo Building Seat Service...
cd seat-service
call mvn clean package -DskipTests
cd ..

echo Building Booking Service...
cd booking-service
call mvn clean package -DskipTests
cd ..

echo Building Payment Service...
cd payment-service
call mvn clean package -DskipTests
cd ..

echo Building Currency Service...
cd currency-service
call mvn clean package -DskipTests
cd ..

echo Building API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

echo Building Eureka Server...
cd eureka-server
call mvn clean package -DskipTests
cd ..

echo All JAR files built successfully!