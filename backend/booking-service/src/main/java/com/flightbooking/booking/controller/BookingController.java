package com.flightbooking.booking.controller;

import com.flightbooking.booking.dto.BookingDTO;
import com.flightbooking.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        Optional<BookingDTO> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pnr/{pnr}")
    public ResponseEntity<BookingDTO> getBookingByPnr(@PathVariable String pnr) {
        Optional<BookingDTO> booking = bookingService.getBookingByPnr(pnr);
        return booking.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<BookingDTO> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @PostMapping
    public BookingDTO createBooking(@RequestBody BookingDTO bookingDTO) {
        return bookingService.createBooking(bookingDTO);
    }

    @PostMapping("/create")
    public BookingDTO createProvisionalBooking(
            @RequestParam Long userId,
            @RequestParam Long flightId,
            @RequestParam List<String> seats,
            @RequestParam BigDecimal amount,
            @RequestParam String currency) {
        return bookingService.createProvisionalBooking(userId, flightId, seats, amount, currency);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) {
        BookingDTO updatedBooking = bookingService.updateBooking(id, bookingDTO);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/confirm/{pnr}")
    public ResponseEntity<String> confirmBooking(@PathVariable String pnr) {
        boolean success = bookingService.confirmBooking(pnr);
        if (success) {
            return ResponseEntity.ok("Booking confirmed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to confirm booking");
        }
    }

    @PostMapping("/cancel/{pnr}")
    public ResponseEntity<String> cancelBooking(@PathVariable String pnr) {
        boolean success = bookingService.cancelBooking(pnr);
        if (success) {
            return ResponseEntity.ok("Booking cancelled successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to cancel booking");
        }
    }
}