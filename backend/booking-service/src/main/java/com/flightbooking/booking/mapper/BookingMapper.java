package com.flightbooking.booking.mapper;

import com.flightbooking.booking.entity.Booking;
import com.flightbooking.booking.dto.BookingDTO;

public class BookingMapper {
    public static BookingDTO toDTO(Booking booking) {
        if (booking == null) {
            return null;
        }
        
        return new BookingDTO(
                booking.getId(),
                booking.getPnr(),
                booking.getUserId(),
                booking.getFlightId(),
                booking.getSeats(),
                booking.getAmount(),
                booking.getCurrency(),
                booking.getStatus()
        );
    }
    
    public static Booking toEntity(BookingDTO bookingDTO) {
        if (bookingDTO == null) {
            return null;
        }
        
        return new Booking(
                bookingDTO.getPnr(),
                bookingDTO.getUserId(),
                bookingDTO.getFlightId(),
                bookingDTO.getSeats(),
                bookingDTO.getAmount(),
                bookingDTO.getCurrency(),
                bookingDTO.getStatus()
        );
    }
}