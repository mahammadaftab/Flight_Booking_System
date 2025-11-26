package com.flightbooking.flight.controller;

import com.flightbooking.flight.dto.FlightDTO;
import com.flightbooking.flight.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<FlightDTO> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long id) {
        Optional<FlightDTO> flight = flightService.getFlightById(id);
        return flight.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<FlightDTO> searchFlights(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime date) {
        return flightService.searchFlights(from, to, date);
    }

    @PostMapping
    public FlightDTO createFlight(@RequestBody FlightDTO flightDTO) {
        return flightService.createFlight(flightDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlightDTO> updateFlight(@PathVariable Long id, @RequestBody FlightDTO flightDTO) {
        FlightDTO updatedFlight = flightService.updateFlight(id, flightDTO);
        if (updatedFlight != null) {
            return ResponseEntity.ok(updatedFlight);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}