package com.flightbooking.seat.repository;

import com.flightbooking.seat.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightId(Long flightId);
    Optional<Seat> findByFlightIdAndSeatId(Long flightId, String seatId);
    List<Seat> findByFlightIdAndStatus(Long flightId, Seat.SeatStatus status);
}