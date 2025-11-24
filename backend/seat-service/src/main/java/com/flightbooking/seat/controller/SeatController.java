package com.flightbooking.seat.controller;

import com.flightbooking.seat.dto.SeatDTO;
import com.flightbooking.seat.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping("/flight/{flightId}")
    public List<SeatDTO> getSeatsByFlightId(@PathVariable Long flightId) {
        return seatService.getSeatsByFlightId(flightId);
    }

    @GetMapping("/flight/{flightId}/seat/{seatId}")
    public ResponseEntity<SeatDTO> getSeatByFlightIdAndSeatId(@PathVariable Long flightId, @PathVariable String seatId) {
        Optional<SeatDTO> seat = seatService.getSeatByFlightIdAndSeatId(flightId, seatId);
        return seat.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/flight/{flightId}/status/{status}")
    public List<SeatDTO> getSeatsByFlightIdAndStatus(@PathVariable Long flightId, @PathVariable String status) {
        return seatService.getSeatsByFlightIdAndStatus(flightId, 
            com.flightbooking.seat.entity.Seat.SeatStatus.valueOf(status.toUpperCase()));
    }

    @PostMapping
    public SeatDTO createSeat(@RequestBody SeatDTO seatDTO) {
        return seatService.createSeat(seatDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatDTO> updateSeat(@PathVariable Long id, @RequestBody SeatDTO seatDTO) {
        SeatDTO updatedSeat = seatService.updateSeat(id, seatDTO);
        if (updatedSeat != null) {
            return ResponseEntity.ok(updatedSeat);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        seatService.deleteSeat(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/flight/{flightId}/seat/{seatId}/lock")
    public ResponseEntity<String> lockSeat(@PathVariable Long flightId, @PathVariable String seatId) {
        boolean success = seatService.lockSeat(flightId, seatId);
        if (success) {
            return ResponseEntity.ok("Seat locked successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to lock seat");
        }
    }

    @PostMapping("/flight/{flightId}/seat/{seatId}/unlock")
    public ResponseEntity<String> unlockSeat(@PathVariable Long flightId, @PathVariable String seatId) {
        boolean success = seatService.unlockSeat(flightId, seatId);
        if (success) {
            return ResponseEntity.ok("Seat unlocked successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to unlock seat");
        }
    }

    @PostMapping("/flight/{flightId}/seat/{seatId}/book")
    public ResponseEntity<String> bookSeat(@PathVariable Long flightId, @PathVariable String seatId) {
        boolean success = seatService.bookSeat(flightId, seatId);
        if (success) {
            return ResponseEntity.ok("Seat booked successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to book seat");
        }
    }
}