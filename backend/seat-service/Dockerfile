FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy the source code
COPY . .

# Build the project
RUN mvn clean package -DskipTests

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "target/seat-service.jar"]