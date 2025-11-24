# Flight Booking System API Documentation

This document provides an overview of the REST APIs available in the Flight Booking System.

## Authentication

All APIs (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Login
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "id": 1,
  "email": "user@example.com",
  "role": "USER"
}
```

### Register
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password",
  "role": "USER"
}
```

**Response:**
```json
{
  "message": "User registered successfully!"
}
```

## Flights

### Get All Flights
```
GET /api/flights
```

**Response:**
```json
[
  {
    "id": 1,
    "flightNumber": "FL001",
    "origin": "JFK",
    "destination": "LAX",
    "departureTime": "2024-12-25T10:00:00",
    "arrivalTime": "2024-12-25T16:00:00",
    "price": 299.99
  }
]
```

### Get Flight by ID
```
GET /api/flights/{id}
```

**Response:**
```json
{
  "id": 1,
  "flightNumber": "FL001",
  "origin": "JFK",
  "destination": "LAX",
  "departureTime": "2024-12-25T10:00:00",
  "arrivalTime": "2024-12-25T16:00:00",
  "price": 299.99
}
```

### Search Flights
```
GET /api/flights/search?from=JFK&to=LAX&date=2024-12-25
```

**Response:**
```json
[
  {
    "id": 1,
    "flightNumber": "FL001",
    "origin": "JFK",
    "destination": "LAX",
    "departureTime": "2024-12-25T10:00:00",
    "arrivalTime": "2024-12-25T16:00:00",
    "price": 299.99
  }
]
```

### Create Flight (Admin only)
```
POST /api/flights
```

**Request Body:**
```json
{
  "flightNumber": "FL002",
  "origin": "LAX",
  "destination": "SFO",
  "departureTime": "2024-12-26T14:00:00",
  "arrivalTime": "2024-12-26T15:30:00",
  "price": 199.99
}
```

## Seats

### Get Seats for Flight
```
GET /api/seats/flight/{flightId}
```

**Response:**
```json
[
  {
    "id": 1,
    "flightId": 1,
    "seatNumber": "A1",
    "isAvailable": true,
    "price": 299.99
  }
]
```

### Lock Seat (WebSocket)
```
WebSocket Connection: /ws-seat-lock
```

**Message to lock seat:**
```json
{
  "type": "LOCK_SEAT",
  "flightId": 1,
  "seatId": 1,
  "userId": 1
}
```

**Message to unlock seat:**
```json
{
  "type": "UNLOCK_SEAT",
  "flightId": 1,
  "seatId": 1,
  "userId": 1
}
```

## Bookings

### Create Booking
```
POST /api/bookings
```

**Request Body:**
```json
{
  "flightId": 1,
  "seatId": 1,
  "passengerName": "John Doe",
  "passengerEmail": "john@example.com"
}
```

### Get User Bookings
```
GET /api/bookings/user/{userId}
```

## Payments

### Process Payment
```
POST /api/payments
```

**Request Body:**
```json
{
  "bookingId": 1,
  "amount": 299.99,
  "currency": "USD",
  "cardNumber": "4111111111111111",
  "expiryDate": "12/25",
  "cvv": "123"
}
```

## Currencies

### Get Exchange Rates
```
GET /api/rates/{fromCurrency}/{toCurrency}
```

**Response:**
```json
{
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "rate": 0.85,
  "timestamp": "2024-12-25T10:00:00"
}
```