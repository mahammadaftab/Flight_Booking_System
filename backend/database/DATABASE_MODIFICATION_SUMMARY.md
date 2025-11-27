# Database Structure Modification Summary

This document summarizes the changes made to the Flight Booking System database structure to align with the requested MongoDB-like collection structure.

## Original Structure
The original database structure included:
- airports
- flights
- seats
- bookings
- booking_seats
- payments
- exchange_rates
- users

## Modified Structure
The modified database structure now includes:

### New Tables Added
1. **countries** - Stores country information
2. **states** - Stores state/province information
3. **aircraft_layouts** - Stores aircraft layout configurations
4. **seat_locks** - Manages seat locking mechanism

### Enhanced Tables
1. **airports** - Added foreign key references to countries and states
2. **flights** - Added foreign key reference to aircraft_layouts
3. **seats** - Added foreign key reference to flights
4. **users** - Added first_name, last_name, and phone fields
5. **bookings** - Added created_at timestamp
6. **payments** - Added created_at timestamp

### Indexes Added
1. **idx_users_email** - Index on users.email for faster lookups
2. **idx_flights_search** - Composite index on flights(origin, destination, departure_utc) for flight searches
3. **idx_bookings_pnr** - Index on bookings.pnr for PNR lookups
4. **idx_seat_locks_expiry** - Index on seat_locks.lock_expiry for cleanup operations
5. **idx_seats_flight** - Index on seats.flight_id for flight-specific seat queries

## Table Details

### countries
- id (BIGSERIAL PRIMARY KEY)
- code (VARCHAR(3) UNIQUE) - ISO country code
- name (VARCHAR(100) UNIQUE)
- continent (VARCHAR(50))

### states
- id (BIGSERIAL PRIMARY KEY)
- code (VARCHAR(10))
- name (VARCHAR(100))
- country_code (VARCHAR(3) FOREIGN KEY to countries.code)

### airports
- id (BIGSERIAL PRIMARY KEY)
- iata (VARCHAR(3) UNIQUE)
- icao (VARCHAR(4) UNIQUE)
- name (VARCHAR(255))
- city (VARCHAR(100))
- state_code (VARCHAR(10) FOREIGN KEY to states.code)
- country_code (VARCHAR(3) FOREIGN KEY to countries.code)
- latitude (DECIMAL(10, 8))
- longitude (DECIMAL(11, 8))
- timezone (VARCHAR(50))

### aircraft_layouts
- id (BIGSERIAL PRIMARY KEY)
- aircraft_type (VARCHAR(50) UNIQUE)
- layout_data (JSONB) - Flexible storage for aircraft layout details
- total_seats (INTEGER)

### flights
- id (BIGSERIAL PRIMARY KEY)
- airline (VARCHAR(100))
- flight_number (VARCHAR(10))
- origin (VARCHAR(3) FOREIGN KEY to airports.iata)
- destination (VARCHAR(3) FOREIGN KEY to airports.iata)
- departure_utc (TIMESTAMP)
- arrival_utc (TIMESTAMP)
- aircraft_type (VARCHAR(50) FOREIGN KEY to aircraft_layouts.aircraft_type)

### seats
- id (BIGSERIAL PRIMARY KEY)
- seat_id (VARCHAR(10))
- class_name (VARCHAR(50))
- row (VARCHAR(10))
- column (VARCHAR(10))
- status (VARCHAR(20))
- flight_id (BIGINT FOREIGN KEY to flights.id)

### seat_locks
- id (BIGSERIAL PRIMARY KEY)
- seat_id (BIGINT FOREIGN KEY to seats.id)
- user_id (BIGINT FOREIGN KEY to users.id)
- lock_expiry (TIMESTAMP)
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### users
- id (BIGSERIAL PRIMARY KEY)
- email (VARCHAR(50) UNIQUE)
- password (VARCHAR(120))
- role (VARCHAR(20))
- first_name (VARCHAR(50))
- last_name (VARCHAR(50))
- phone (VARCHAR(20))
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### bookings
- id (BIGSERIAL PRIMARY KEY)
- pnr (VARCHAR(10) UNIQUE)
- user_id (BIGINT FOREIGN KEY to users.id)
- flight_id (BIGINT FOREIGN KEY to flights.id)
- amount (DECIMAL(10, 2))
- currency (VARCHAR(3))
- status (VARCHAR(20))
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### booking_seats
- booking_id (BIGINT FOREIGN KEY to bookings.id)
- seat_id (BIGINT FOREIGN KEY to seats.id)
- PRIMARY KEY (booking_id, seat_id)

### payments
- id (BIGSERIAL PRIMARY KEY)
- transaction_ref (VARCHAR(50) UNIQUE)
- booking_id (BIGINT FOREIGN KEY to bookings.id)
- status (VARCHAR(20))
- provider (VARCHAR(50))
- amount (DECIMAL(10, 2))
- currency (VARCHAR(3))
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### exchange_rates
- id (BIGSERIAL PRIMARY KEY)
- from_currency (VARCHAR(3))
- to_currency (VARCHAR(3))
- rate (DECIMAL(10, 6))
- last_updated (TIMESTAMP)

## Benefits of This Structure

1. **Enhanced Data Integrity**: Foreign key constraints ensure data consistency
2. **Improved Query Performance**: Strategic indexes optimize common queries
3. **Scalability**: Normalized structure supports large datasets
4. **Flexibility**: JSONB field in aircraft_layouts allows for flexible layout storage
5. **Real-time Seat Locking**: Dedicated seat_locks table enables real-time seat selection
6. **Geographic Hierarchy**: Proper country/state/airport relationships
7. **Audit Trail**: Timestamps on key tables for tracking changes

## Migration Notes

To migrate from the original structure to this modified structure:

1. Backup the existing database
2. Apply the schema changes in schema_modified.sql
3. Update the seed data with seed_modified.sql
4. Update the application code to use the new table relationships
5. Test thoroughly before deploying to production

## Usage in Services

Each microservice will need to be updated to work with the new structure:
- **Auth Service**: Will use the enhanced users table
- **Flight Service**: Will use the enhanced flights, airports, countries, states, and aircraft_layouts tables
- **Seat Service**: Will use the enhanced seats and new seat_locks tables
- **Booking Service**: Will use the enhanced bookings and booking_seats tables
- **Payment Service**: Will use the enhanced payments table
- **Currency Service**: Will continue to use exchange_rates table