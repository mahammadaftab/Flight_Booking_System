package com.flightbooking.flight.service;

import com.flightbooking.flight.entity.Airport;
import com.flightbooking.flight.repository.AirportRepository;
import com.flightbooking.flight.dto.AirportDTO;
import com.flightbooking.flight.mapper.AirportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AirportService {
    @Autowired
    private AirportRepository airportRepository;

    public List<AirportDTO> getAllAirports() {
        return airportRepository.findAll().stream()
                .map(AirportMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<AirportDTO> getAirportById(Long id) {
        return airportRepository.findById(id).map(AirportMapper::toDTO);
    }

    public Optional<AirportDTO> getAirportByIata(String iata) {
        return airportRepository.findByIata(iata).map(AirportMapper::toDTO);
    }

    public List<AirportDTO> getAirportsByCountry(String country) {
        return airportRepository.findByCountry(country).stream()
                .map(AirportMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<AirportDTO> getAirportsByCountryAndState(String country, String state) {
        return airportRepository.findByCountryAndState(country, state).stream()
                .map(AirportMapper::toDTO)
                .collect(Collectors.toList());
    }

    public AirportDTO createAirport(AirportDTO airportDTO) {
        Airport airport = AirportMapper.toEntity(airportDTO);
        Airport savedAirport = airportRepository.save(airport);
        return AirportMapper.toDTO(savedAirport);
    }

    public AirportDTO updateAirport(Long id, AirportDTO airportDTO) {
        if (airportRepository.existsById(id)) {
            Airport airport = AirportMapper.toEntity(airportDTO);
            airport.setId(id);
            Airport savedAirport = airportRepository.save(airport);
            return AirportMapper.toDTO(savedAirport);
        }
        return null;
    }

    public void deleteAirport(Long id) {
        airportRepository.deleteById(id);
    }
}