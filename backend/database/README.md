# Flight Booking System Database Update

This directory contains scripts and data to expand the Flight Booking System database with comprehensive world flights data.

## Files

- `seed.sql` - Original database seed file
- `world_flights.sql` - Expanded database with flights from around the world
- `update_database.sh` - Script to update the database (instructions only)

## World Flights Data

The `world_flights.sql` file contains:

### Airports
- 30+ major airports from all continents
- Organized by countries and states/regions
- Includes IATA/ICAO codes, coordinates, and timezones

### Flights
- 70+ flights covering major international routes
- Organized by geographic regions:
  - North American Routes
  - South American Routes
  - European Routes
  - Asian Routes
  - African Routes
  - Oceania Routes
  - Intercontinental Routes

### Airlines Represented
- Air Canada (AC)
- WestJet (WS)
- Aeromexico (AM)
- LATAM (LA)
- Aerolineas Argentinas (AR)
- Lufthansa (LH)
- Air France (AF)
- KLM (KL)
- Iberia (IB)
- Turkish Airlines (TK)
- SAS (SK)
- Air China (CA)
- All Nippon Airways (NH)
- Korean Air (KE)
- Air India (AI)
- Saudi Arabian Airlines (SV)
- Singapore Airlines (SQ)
- Malaysia Airlines (MH)
- South African Airways (SA)
- Ethiopian Airlines (ET)
- EgyptAir (MS)
- Qantas (QF)
- Jetstar (JQ)
- Air New Zealand (NZ)
- British Airways (BA)
- United Airlines (UA)
- Emirates (EK)

### Sample Seats
- Sample seat data for select flights
- Includes both Economy and Business class seats

### Exchange Rates
- Updated exchange rates for major world currencies
- Relative to USD

## How to Update the Database

1. Start the backend services:
   ```bash
   ./start-services.sh
   ```

2. Access the H2 database console:
   - Open your browser and go to: http://localhost:8082/h2-console
   - JDBC URL: jdbc:h2:mem:testdb
   - User Name: sa
   - Password: password

3. Copy the contents of `world_flights.sql` and paste it into the H2 console SQL editor

4. Execute the script

## Verification

After updating the database, you can verify the new data by running queries such as:

```sql
-- Check the number of airports
SELECT COUNT(*) FROM airports;

-- Check the number of flights
SELECT COUNT(*) FROM flights;

-- View some sample flights
SELECT * FROM flights LIMIT 10;

-- Check flights from a specific airport
SELECT * FROM flights WHERE origin = 'JFK';
```

## Notes

- The database uses an in-memory H2 database that resets on each application restart
- To make the changes persistent, you would need to configure a file-based database
- The flight data is for demonstration purposes and uses a fixed date (2026-01-10)