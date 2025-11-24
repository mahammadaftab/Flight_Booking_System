package com.flightbooking.booking.service;

import com.flightbooking.booking.entity.Booking;
import com.flightbooking.booking.repository.BookingRepository;
import com.flightbooking.booking.dto.BookingDTO;
import com.flightbooking.booking.mapper.BookingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<BookingDTO> getBookingById(Long id) {
        return bookingRepository.findById(id).map(BookingMapper::toDTO);
    }

    public Optional<BookingDTO> getBookingByPnr(String pnr) {
        return bookingRepository.findByPnr(pnr).map(BookingMapper::toDTO);
    }

    public List<BookingDTO> getBookingsByUserId(Long userId) {
        // In a real implementation, we would need a custom query method
        return bookingRepository.findAll().stream()
                .filter(booking -> booking.getUserId().equals(userId))
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = BookingMapper.toEntity(bookingDTO);
        Booking savedBooking = bookingRepository.save(booking);
        return BookingMapper.toDTO(savedBooking);
    }

    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        if (bookingRepository.existsById(id)) {
            Booking booking = BookingMapper.toEntity(bookingDTO);
            booking.setId(id);
            Booking savedBooking = bookingRepository.save(booking);
            return BookingMapper.toDTO(savedBooking);
        }
        return null;
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public BookingDTO createProvisionalBooking(Long userId, Long flightId, List<String> seats, BigDecimal amount, String currency) {
        // Generate a unique PNR (in a real implementation, this would be more sophisticated)
        String pnr = generatePNR();
        
        Booking booking = new Booking(pnr, userId, flightId, seats, amount, currency, Booking.BookingStatus.PENDING);
        Booking savedBooking = bookingRepository.save(booking);
        return BookingMapper.toDTO(savedBooking);
    }

    public boolean confirmBooking(String pnr) {
        Optional<Booking> bookingOpt = bookingRepository.findByPnr(pnr);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(Booking.BookingStatus.CONFIRMED);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    public boolean cancelBooking(String pnr) {
        Optional<Booking> bookingOpt = bookingRepository.findByPnr(pnr);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(Booking.BookingStatus.CANCELLED);
            bookingRepository.save(booking);
            return true;
        }
        return false;
    }

    private String generatePNR() {
        // Simple PNR generation (in a real implementation, this would be more sophisticated)
        return "PNR" + System.currentTimeMillis();
    }
}