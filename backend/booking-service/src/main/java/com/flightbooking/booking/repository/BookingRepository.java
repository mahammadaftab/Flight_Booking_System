package com.flightbooking.booking.repository;

import com.flightbooking.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByPnr(String pnr);
    Optional<Booking> findByUserId(Long userId);
    Optional<Booking> findByFlightId(Long flightId);
}