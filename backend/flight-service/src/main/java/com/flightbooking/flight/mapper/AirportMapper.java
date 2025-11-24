package com.flightbooking.flight.mapper;

import com.flightbooking.flight.entity.Airport;
import com.flightbooking.flight.dto.AirportDTO;

public class AirportMapper {
    public static AirportDTO toDTO(Airport airport) {
        if (airport == null) {
            return null;
        }
        
        return new AirportDTO(
                airport.getId(),
                airport.getIata(),
                airport.getIcao(),
                airport.getName(),
                airport.getCity(),
                airport.getState(),
                airport.getCountry(),
                airport.getLatitude(),
                airport.getLongitude(),
                airport.getTimezone()
        );
    }
    
    public static Airport toEntity(AirportDTO airportDTO) {
        if (airportDTO == null) {
            return null;
        }
        
        return new Airport(
                airportDTO.getIata(),
                airportDTO.getIcao(),
                airportDTO.getName(),
                airportDTO.getCity(),
                airportDTO.getState(),
                airportDTO.getCountry(),
                airportDTO.getLatitude(),
                airportDTO.getLongitude(),
                airportDTO.getTimezone()
        );
    }
}