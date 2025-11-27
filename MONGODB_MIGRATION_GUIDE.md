# MongoDB Migration Guide

This document provides a comprehensive guide for migrating the Flight Booking System from a relational database (H2/PostgreSQL) to MongoDB.

## Overview

The migration involves:
1. Updating Maven dependencies to use Spring Data MongoDB
2. Modifying entity classes to use MongoDB annotations
3. Updating repository interfaces to extend MongoRepository
4. Updating application configuration files
5. Creating new service classes for MongoDB operations

## Key Changes Made

### 1. Parent POM Update
Created a new parent POM (`pom-mongo.xml`) with MongoDB dependencies:
- Replaced `spring-boot-starter-data-jpa` with `spring-boot-starter-data-mongodb`
- Added MongoDB version property

### 2. Application Configuration
Created MongoDB configuration files (`application-mongo.yml`) for each service:
- Replaced JDBC datasource configuration with MongoDB URI
- Configured MongoDB database name

### 3. Entity Classes
Created new MongoDB entity classes:
- Used `@Document` annotation to map to MongoDB collections
- Used `@Id` annotation for MongoDB ObjectID
- Added `@Indexed` annotation for email field
- Added additional fields (firstName, lastName, phone)

### 4. Repository Interfaces
Created new MongoDB repository interfaces:
- Extended `MongoRepository` instead of `JpaRepository`
- Maintained the same method signatures for compatibility

### 5. Service Classes
Created new service classes for MongoDB operations:
- Updated methods to work with MongoDB entities
- Maintained password encoding functionality

## Migration Steps

### Step 1: Install MongoDB
Install MongoDB on your system or use a cloud MongoDB service like MongoDB Atlas.

### Step 2: Update Dependencies
Replace the existing `pom.xml` files with versions that include MongoDB dependencies:
- Remove `spring-boot-starter-data-jpa`
- Add `spring-boot-starter-data-mongodb`
- Update other dependencies as needed

### Step 3: Update Entity Classes
Replace JPA entity annotations with MongoDB annotations:
- Replace `@Entity` with `@Document(collection = "collection_name")`
- Replace `@Id` with `@Id` (from Spring Data MongoDB)
- Replace `@GeneratedValue` (not needed in MongoDB)
- Replace `@Column` with direct field mapping
- Add `@Indexed` for fields that need indexing

### Step 4: Update Repository Interfaces
Update repository interfaces to extend MongoRepository:
- Change `extends JpaRepository<Entity, Long>` to `extends MongoRepository<Entity, String>`
- Update method signatures if needed

### Step 5: Update Application Configuration
Update `application.yml` files:
- Remove `spring.datasource` configuration
- Add `spring.data.mongodb` configuration
- Update any other database-specific settings

### Step 6: Update Service Classes
Update service classes to work with MongoDB:
- Update method implementations to use MongoDB repositories
- Handle String IDs instead of Long IDs
- Update any database-specific logic

## Collections Structure

The MongoDB database will have the following collections:

1. **users** - User authentication and profile information
2. **countries** - Country information
3. **states** - State/Province information
4. **airports** - Airport information
5. **flights** - Flight information
6. **seats** - Seat information
7. **seatLocks** - Real-time seat locking information
8. **bookings** - Booking information
9. **bookingSeats** - Booking-seat relationships
10. **payments** - Payment information
11. **exchangeRates** - Currency exchange rates
12. **aircraftLayouts** - Aircraft layout configurations

## Benefits of MongoDB Migration

1. **Flexible Schema**: MongoDB's document model allows for flexible schema design
2. **Horizontal Scaling**: MongoDB supports horizontal scaling through sharding
3. **Rich Queries**: MongoDB supports complex queries and aggregations
4. **GeoSpatial Queries**: Built-in support for geospatial queries
5. **Embedded Documents**: Related data can be embedded for better performance
6. **GridFS**: Built-in support for storing large files

## Migration Considerations

1. **Data Migration**: Existing data in relational databases will need to be migrated to MongoDB
2. **ID Handling**: MongoDB uses String ObjectIDs instead of numeric IDs
3. **Transactions**: MongoDB supports multi-document transactions but with some limitations
4. **Indexing**: MongoDB indexes work differently than relational database indexes
5. **Query Language**: MongoDB uses a different query language than SQL
6. **Relationships**: MongoDB doesn't have foreign key constraints, so relationships must be handled in application code

## Testing the Migration

1. Start MongoDB server
2. Update application configuration to use MongoDB
3. Run the application and verify all services start correctly
4. Test CRUD operations for each entity
5. Test authentication and authorization
6. Test flight search and booking functionality
7. Test payment processing
8. Test real-time seat selection

## Rollback Plan

If issues are encountered during migration:
1. Revert to the original relational database configuration
2. Restore data from backups
3. Update application configuration to use relational database
4. Verify all functionality works correctly

## Next Steps

1. Apply these changes to all microservices
2. Create MongoDB collections and indexes
3. Migrate existing data from relational databases
4. Test all functionality thoroughly
5. Update documentation
6. Deploy to production environment