package com.flightbooking.flight.repository;

import com.flightbooking.flight.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findByIata(String iata);
    Optional<Airport> findByIcao(String icao);
    List<Airport> findByCountry(String country);
    List<Airport> findByCountryAndState(String country, String state);
}