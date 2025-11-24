package com.flightbooking.flight.dto;

import java.time.LocalDateTime;

public class FlightDTO {
    private Long id;
    private String airline;
    private String flightNumber;
    private String origin;
    private String destination;
    private LocalDateTime departureUtc;
    private LocalDateTime arrivalUtc;
    private String aircraftType;

    // Constructors
    public FlightDTO() {}

    public FlightDTO(Long id, String airline, String flightNumber, String origin, String destination, LocalDateTime departureUtc, LocalDateTime arrivalUtc, String aircraftType) {
        this.id = id;
        this.airline = airline;
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureUtc = departureUtc;
        this.arrivalUtc = arrivalUtc;
        this.aircraftType = aircraftType;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDepartureUtc() {
        return departureUtc;
    }

    public void setDepartureUtc(LocalDateTime departureUtc) {
        this.departureUtc = departureUtc;
    }

    public LocalDateTime getArrivalUtc() {
        return arrivalUtc;
    }

    public void setArrivalUtc(LocalDateTime arrivalUtc) {
        this.arrivalUtc = arrivalUtc;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }
}