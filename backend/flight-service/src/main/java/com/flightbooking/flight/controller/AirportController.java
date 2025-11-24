package com.flightbooking.flight.controller;

import com.flightbooking.flight.dto.AirportDTO;
import com.flightbooking.flight.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/airports")
public class AirportController {
    @Autowired
    private AirportService airportService;

    @GetMapping
    public List<AirportDTO> getAllAirports() {
        return airportService.getAllAirports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AirportDTO> getAirportById(@PathVariable Long id) {
        Optional<AirportDTO> airport = airportService.getAirportById(id);
        return airport.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/iata/{iata}")
    public ResponseEntity<AirportDTO> getAirportByIata(@PathVariable String iata) {
        Optional<AirportDTO> airport = airportService.getAirportByIata(iata);
        return airport.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/country/{country}")
    public List<AirportDTO> getAirportsByCountry(@PathVariable String country) {
        return airportService.getAirportsByCountry(country);
    }

    @GetMapping("/country/{country}/state/{state}")
    public List<AirportDTO> getAirportsByCountryAndState(@PathVariable String country, @PathVariable String state) {
        return airportService.getAirportsByCountryAndState(country, state);
    }

    @PostMapping
    public AirportDTO createAirport(@RequestBody AirportDTO airportDTO) {
        return airportService.createAirport(airportDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AirportDTO> updateAirport(@PathVariable Long id, @RequestBody AirportDTO airportDTO) {
        AirportDTO updatedAirport = airportService.updateAirport(id, airportDTO);
        if (updatedAirport != null) {
            return ResponseEntity.ok(updatedAirport);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable Long id) {
        airportService.deleteAirport(id);
        return ResponseEntity.noContent().build();
    }
}