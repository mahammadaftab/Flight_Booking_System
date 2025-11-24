package com.flightbooking.seat.mapper;

import com.flightbooking.seat.entity.Seat;
import com.flightbooking.seat.dto.SeatDTO;

public class SeatMapper {
    public static SeatDTO toDTO(Seat seat) {
        if (seat == null) {
            return null;
        }
        
        return new SeatDTO(
                seat.getId(),
                seat.getSeatId(),
                seat.getClassName(),
                seat.getRow(),
                seat.getColumn(),
                seat.getStatus(),
                seat.getLockExpiry(),
                seat.getFlightId()
        );
    }
    
    public static Seat toEntity(SeatDTO seatDTO) {
        if (seatDTO == null) {
            return null;
        }
        
        return new Seat(
                seatDTO.getSeatId(),
                seatDTO.getClassName(),
                seatDTO.getRow(),
                seatDTO.getColumn(),
                seatDTO.getStatus(),
                seatDTO.getLockExpiry(),
                seatDTO.getFlightId()
        );
    }
}