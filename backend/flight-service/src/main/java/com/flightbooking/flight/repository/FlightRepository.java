package com.flightbooking.flight.repository;

import com.flightbooking.flight.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByOriginAndDestinationAndDepartureUtcBetween(String origin, String destination, LocalDateTime start, LocalDateTime end);
}