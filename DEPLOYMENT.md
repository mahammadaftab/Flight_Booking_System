# Flight Booking System Deployment Guide

This guide provides detailed instructions for deploying the Flight Booking System, a microservices-based application built with Spring Boot and React.

## Prerequisites

Before deploying the application, ensure you have the following installed:

- Java 17 or higher
- Maven 3.8 or higher
- Docker and Docker Compose
- Node.js 16 or higher
- npm 8 or higher
- Git

## Architecture Overview

The Flight Booking System consists of the following microservices:

1. **Eureka Server** - Service discovery
2. **API Gateway** - Entry point for all client requests
3. **Auth Service** - User authentication and authorization
4. **Flight Service** - Flight and airport management
5. **Seat Service** - Seat selection and real-time locking
6. **Booking Service** - Booking management
7. **Payment Service** - Payment processing
8. **Currency Service** - Multi-currency support

## Deployment Options

### Option 1: Docker Compose Deployment (Recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Flight_Booking_System
   ```

2. **Build the services:**
   ```bash
   mvn clean package -DskipTests
   ```

3. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080
   - Eureka Dashboard: http://localhost:8761

### Option 2: Manual Deployment

1. **Start the Eureka Server:**
   ```bash
   cd backend/eureka-server
   mvn spring-boot:run
   ```

2. **Start the API Gateway:**
   ```bash
   cd backend/api-gateway
   mvn spring-boot:run
   ```

3. **Start all other services in separate terminals:**
   ```bash
   # Auth Service
   cd backend/auth-service
   mvn spring-boot:run
   
   # Flight Service
   cd backend/flight-service
   mvn spring-boot:run
   
   # Seat Service
   cd backend/seat-service
   mvn spring-boot:run
   
   # Booking Service
   cd backend/booking-service
   mvn spring-boot:run
   
   # Payment Service
   cd backend/payment-service
   mvn spring-boot:run
   
   # Currency Service
   cd backend/currency-service
   mvn spring-boot:run
   ```

4. **Start the React frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Environment Configuration

### Database Configuration

All services use H2 in-memory databases by default. For production deployment, you should configure external databases:

1. Update the `application.yml` files in each service
2. Replace H2 configuration with your preferred database (PostgreSQL, MySQL, etc.)
3. Update connection strings, usernames, and passwords

### JWT Configuration

The Auth Service uses a default JWT secret. For production:

1. Update `app.jwtSecret` in `auth-service/src/main/resources/application.yml`
2. Use a strong, randomly generated secret
3. Consider using environment variables for sensitive configuration

### Port Configuration

Default ports:
- Eureka Server: 8761
- API Gateway: 8080
- Auth Service: 8081
- Flight Service: 8082
- Seat Service: 8083
- Booking Service: 8084
- Payment Service: 8085
- Currency Service: 8086
- React Frontend: 3000

## Monitoring and Observability

### Prometheus and Grafana

1. Start monitoring services:
   ```bash
   docker-compose -f monitoring/docker-compose.monitoring.yml up
   ```

2. Access the tools:
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001

### Health Checks

Each service exposes health endpoints at `/actuator/health`

## Security Considerations

1. **HTTPS**: Enable HTTPS in production
2. **CORS**: Review and restrict CORS policies
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Input Validation**: All services implement validation, but review for your use case
5. **Secrets Management**: Use secure secrets management in production

## Scaling and Load Balancing

The application uses Eureka for service discovery and client-side load balancing. For horizontal scaling:

1. Start multiple instances of any service
2. Eureka will automatically register and load balance between instances
3. Use Docker Compose with replicas for easy scaling

## Backup and Recovery

1. **Database Backups**: Implement regular backups for your production databases
2. **Configuration Backups**: Keep backups of all configuration files
3. **Disaster Recovery**: Test your disaster recovery procedures regularly

## Troubleshooting

### Common Issues

1. **Services not registering with Eureka**:
   - Check network connectivity
   - Verify Eureka server is running
   - Check service configuration

2. **Frontend not connecting to backend**:
   - Check API Gateway configuration
   - Verify CORS settings
   - Check browser console for errors

3. **Database connection issues**:
   - Verify database credentials
   - Check database connectivity
   - Ensure database is running

### Logs and Monitoring

- Check service logs for error messages
- Use Actuator endpoints for health information
- Monitor with Prometheus and Grafana

## Maintenance

1. **Regular Updates**: Keep dependencies up to date
2. **Security Patches**: Apply security patches promptly
3. **Performance Monitoring**: Monitor application performance
4. **Log Rotation**: Implement log rotation for production

## Support

For issues with deployment, please check the project documentation or contact the development team.