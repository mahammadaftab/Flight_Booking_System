package com.flightbooking.flight.service;

import com.flightbooking.flight.entity.Flight;
import com.flightbooking.flight.repository.FlightRepository;
import com.flightbooking.flight.dto.FlightDTO;
import com.flightbooking.flight.mapper.FlightMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(FlightMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<FlightDTO> getFlightById(Long id) {
        return flightRepository.findById(id).map(FlightMapper::toDTO);
    }

    public List<FlightDTO> searchFlights(String origin, String destination, LocalDateTime date) {
        LocalDateTime startOfDay = date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = date.withHour(23).withMinute(59).withSecond(59);
        
        return flightRepository.findByOriginAndDestinationAndDepartureUtcBetween(origin, destination, startOfDay, endOfDay)
                .stream()
                .map(FlightMapper::toDTO)
                .collect(Collectors.toList());
    }

    public FlightDTO createFlight(FlightDTO flightDTO) {
        Flight flight = FlightMapper.toEntity(flightDTO);
        Flight savedFlight = flightRepository.save(flight);
        return FlightMapper.toDTO(savedFlight);
    }

    public FlightDTO updateFlight(Long id, FlightDTO flightDTO) {
        if (flightRepository.existsById(id)) {
            Flight flight = FlightMapper.toEntity(flightDTO);
            flight.setId(id);
            Flight savedFlight = flightRepository.save(flight);
            return FlightMapper.toDTO(savedFlight);
        }
        return null;
    }

    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}