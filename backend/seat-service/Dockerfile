FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the pre-built JAR file
COPY target/seat-service-1.0.0.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-cp", "app.jar", "org.springframework.boot.loader.PropertiesLauncher"]