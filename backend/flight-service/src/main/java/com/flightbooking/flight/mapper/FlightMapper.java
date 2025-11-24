package com.flightbooking.flight.mapper;

import com.flightbooking.flight.entity.Flight;
import com.flightbooking.flight.dto.FlightDTO;

public class FlightMapper {
    public static FlightDTO toDTO(Flight flight) {
        if (flight == null) {
            return null;
        }
        
        return new FlightDTO(
                flight.getId(),
                flight.getAirline(),
                flight.getFlightNumber(),
                flight.getOrigin(),
                flight.getDestination(),
                flight.getDepartureUtc(),
                flight.getArrivalUtc(),
                flight.getAircraftType()
        );
    }
    
    public static Flight toEntity(FlightDTO flightDTO) {
        if (flightDTO == null) {
            return null;
        }
        
        return new Flight(
                flightDTO.getAirline(),
                flightDTO.getFlightNumber(),
                flightDTO.getOrigin(),
                flightDTO.getDestination(),
                flightDTO.getDepartureUtc(),
                flightDTO.getArrivalUtc(),
                flightDTO.getAircraftType()
        );
    }
}