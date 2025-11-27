# Flight Booking System

A real-time, secure, worldwide Flight Booking Web Application built with Java Spring Boot microservices backend and React frontend.

![Build Status](https://github.com/your-username/flight-booking-system/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Services](#services)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Monitoring](#monitoring)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Flight Booking System is a comprehensive solution for booking flights with real-time seat selection, multi-currency payments, and global airport coverage. The system is built using a microservices architecture for scalability and maintainability.

## Features

- **Global Coverage**: 10,000+ airports with IATA/ICAO codes, country, and state metadata
- **Real-time Seat Selection**: WebSocket-based seat locking with live updates
- **Multi-currency Support**: Dynamic currency conversion with caching
- **Secure Payments**: PCI-DSS compliant payment processing
- **High Availability**: Microservices architecture with load balancing
- **Observability**: Prometheus metrics and Grafana dashboards
- **Security**: JWT authentication, OAuth2, and rate limiting
- **Responsive UI**: Modern React frontend with responsive design
- **Admin Panel**: Comprehensive admin dashboard for system management
- **Comprehensive Testing**: Unit and integration tests for all services

## Architecture

The system follows a microservices architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │  Service        │
│   (React)       │◄──►│   (Spring       │◄──►│  Discovery      │
└─────────────────┘    │   Cloud         │    │  (Eureka)       │
                       │   Gateway)      │    └─────────────────┘
┌─────────────────┐    └─────────────────┘              ▲
│   PostgreSQL    │                                     │
│   (Database)    │                                     ▼
└─────────────────┘    ┌─────────────────┐    ┌─────────────────┐
                       │   Redis         │    │   Microservices │
┌─────────────────┐    │   (Caching &    │    │   (Auth, Flight,│
│   Monitoring    │    │   Seat Locks)   │    │   Seat, Booking,│
│   (Prometheus   │    └─────────────────┘    │   Payment,      │
│   & Grafana)    │                           │   Currency)     │
└─────────────────┘                           └─────────────────┘
```

## Tech Stack

### Backend
- **Java 17+** with Spring Boot
- **Spring Cloud** for microservices
- **Spring Security** for authentication
- **Spring Data JPA** with Hibernate
- **H2 Database** for development (PostgreSQL for production)
- **Redis** for caching and seat locks
- **WebSocket** for real-time communication
- **JUnit 5** for testing
- **Mockito** for mocking in tests

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for HTTP requests
- **Stomp.js** for WebSocket communication
- **Tailwind CSS** for styling
- **Jest** for testing
- **React Testing Library** for component testing

### Infrastructure
- **GitHub Actions** for CI/CD
- **Prometheus & Grafana** for monitoring
- **Eureka** for service discovery
- **Spring Cloud Gateway** for API gateway

## Services

The Flight Booking System consists of the following microservices:

1. **Auth Service** (`auth-service`) - User authentication and authorization
   - JWT token generation and validation
   - User registration and login
   - Role-based access control

2. **Flight Service** (`flight-service`) - Flight and airport management
   - Flight search and filtering
   - Airport management
   - Flight scheduling

3. **Seat Service** (`seat-service`) - Real-time seat selection and locking
   - WebSocket-based real-time seat selection
   - Seat locking mechanism
   - Seat availability management

4. **Booking Service** (`booking-service`) - Booking management
   - Booking creation and management
   - Booking history
   - Booking status tracking

5. **Payment Service** (`payment-service`) - Payment processing
   - Secure payment processing
   - Payment status management
   - Transaction logging

6. **Currency Service** (`currency-service`) - Currency conversion
   - Real-time currency exchange rates
   - Currency conversion caching
   - Multi-currency support

7. **API Gateway** (`api-gateway`) - API routing and load balancing
   - Request routing
   - Load balancing
   - Security filtering

8. **Eureka Server** (`eureka-server`) - Service discovery
   - Service registration
   - Service discovery
   - Health monitoring

### Services Overview

When starting the system using the provided scripts or manual commands, all services should start successfully:

1. **Frontend** - React application serving the user interface on port 3000
2. **PostgreSQL** - Database service on port 5432 (when running with Docker)
3. **Redis** - Caching and seat locking service on port 6379 (when running with Docker)

Note: For local development, services use in-memory H2 databases by default, so PostgreSQL is not required. Redis is only needed for seat locking functionality.

## Project Structure

```
Flight_Booking_System/
├── backend/
│   ├── api-gateway/          # API Gateway service
│   ├── auth-service/          # Authentication service
│   ├── booking-service/       # Booking management service
│   ├── currency-service/      # Currency conversion service
│   ├── eureka-server/         # Service discovery server
│   ├── flight-service/        # Flight and airport management service
│   ├── payment-service/       # Payment processing service
│   ├── seat-service/          # Seat selection and locking service
│   └── pom.xml                # Parent Maven configuration
├── frontend/                  # React frontend application
├── monitoring/                # Monitoring configuration
│   ├── grafana/               # Grafana dashboards
│   └── prometheus/            # Prometheus configuration
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 16+
- Git

### Running the Application (Recommended Approach)

```bash
# Clone the repository
git clone <repository-url>
cd Flight_Booking_System

# On Windows, run the batch script to start all backend services:
run-backend-services.bat

# Or use the PowerShell script:
run-backend-services.ps1

# On Unix/Linux/MacOS, you can start services individually (see below)
```

### Running Individual Services

1. Start services in separate terminals:
```bash
cd backend/eureka-server
mvn spring-boot:run

cd backend/api-gateway
mvn spring-boot:run

cd backend/auth-service
mvn spring-boot:run

cd backend/flight-service
mvn spring-boot:run

cd backend/seat-service
mvn spring-boot:run

cd backend/booking-service
mvn spring-boot:run

cd backend/payment-service
mvn spring-boot:run

cd backend/currency-service
mvn spring-boot:run
```

Alternatively, you can use the provided scripts:
- On Windows: `run-backend-services.bat` or `run-backend-services.ps1`
- On Unix/Linux/MacOS: Create a similar shell script based on the provided Windows scripts

2. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Each service can be configured with environment variables. See individual `application.yml` files for available options.

## Deployment

The system can be deployed to various cloud platforms:

- **Render** - For simple deployment
- **AWS** - Using ECS or EKS
- **Google Cloud** - Using GKE
- **Azure** - Using AKS

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## API Documentation

API documentation is available through Swagger UI when running the services:

- Auth Service: http://localhost:8081/swagger-ui.html
- Flight Service: http://localhost:8082/swagger-ui.html
- Seat Service: http://localhost:8083/swagger-ui.html
- Booking Service: http://localhost:8084/swagger-ui.html
- Payment Service: http://localhost:8085/swagger-ui.html
- Currency Service: http://localhost:8086/swagger-ui.html

API documentation is also available through the API Gateway:
- All APIs: http://localhost:8080/swagger-ui.html

Note: These services need to be running for the API documentation to be accessible. With the new setup, all services should start successfully.

## Testing

### Backend Testing
```bash
cd backend
mvn test
```

Run tests with coverage:
```bash
cd backend
mvn test jacoco:report
```

### Frontend Testing
```bash
cd frontend
npm test
```

Run tests with coverage:
```bash
cd frontend
npm test -- --coverage
```

### Integration Testing
Integration tests are available in each service's `src/test` directory.

## Monitoring

The system includes monitoring with Prometheus and Grafana:

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

### Metrics
Each service exposes metrics at `/actuator/prometheus` endpoint.

### Health Checks
Health checks are available at `/actuator/health` endpoint for each service.

Note: Monitoring services require the backend services to be running properly.

## Security

The system implements multiple security measures:

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement
- PCI-DSS compliance for payments
- CORS configuration
- Secure password hashing with BCrypt
- Session management

### Security Best Practices

For production deployment:
1. Use strong, randomly generated JWT secrets
2. Configure HTTPS certificates
3. Set up proper firewall rules
4. Regularly update dependencies
5. Implement proper secrets management
6. Enable security scanning in CI/CD pipeline

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.