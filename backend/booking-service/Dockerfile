FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy the source code
COPY . .

# Build the project with offline mode and skip tests
RUN mvn clean package -DskipTests -o --fail-never || mvn clean package -DskipTests

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "target/booking-service-1.0.0.jar"]