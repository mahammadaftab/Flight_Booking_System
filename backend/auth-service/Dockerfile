FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy the source code
COPY . .

# Build the project
RUN mvn clean package -DskipTests

# Copy the JAR file to the root directory
RUN cp target/auth-service-1.0.0.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]