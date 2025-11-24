package com.flightbooking.seat.service;

import com.flightbooking.seat.entity.Seat;
import com.flightbooking.seat.repository.SeatRepository;
import com.flightbooking.seat.dto.SeatDTO;
import com.flightbooking.seat.mapper.SeatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public List<SeatDTO> getSeatsByFlightId(Long flightId) {
        return seatRepository.findByFlightId(flightId).stream()
                .map(SeatMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<SeatDTO> getSeatByFlightIdAndSeatId(Long flightId, String seatId) {
        return seatRepository.findByFlightIdAndSeatId(flightId, seatId).map(SeatMapper::toDTO);
    }

    public List<SeatDTO> getSeatsByFlightIdAndStatus(Long flightId, Seat.SeatStatus status) {
        return seatRepository.findByFlightIdAndStatus(flightId, status).stream()
                .map(SeatMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SeatDTO createSeat(SeatDTO seatDTO) {
        Seat seat = SeatMapper.toEntity(seatDTO);
        Seat savedSeat = seatRepository.save(seat);
        return SeatMapper.toDTO(savedSeat);
    }

    public SeatDTO updateSeat(Long id, SeatDTO seatDTO) {
        if (seatRepository.existsById(id)) {
            Seat seat = SeatMapper.toEntity(seatDTO);
            seat.setId(id);
            Seat savedSeat = seatRepository.save(seat);
            return SeatMapper.toDTO(savedSeat);
        }
        return null;
    }

    public void deleteSeat(Long id) {
        seatRepository.deleteById(id);
    }

    public boolean lockSeat(Long flightId, String seatId) {
        Optional<Seat> seatOpt = seatRepository.findByFlightIdAndSeatId(flightId, seatId);
        if (seatOpt.isPresent()) {
            Seat seat = seatOpt.get();
            if (seat.getStatus() == Seat.SeatStatus.AVAILABLE) {
                seat.setStatus(Seat.SeatStatus.LOCKED);
                seat.setLockExpiry(LocalDateTime.now().plusMinutes(5)); // Lock for 5 minutes
                seatRepository.save(seat);
                return true;
            }
        }
        return false;
    }

    public boolean unlockSeat(Long flightId, String seatId) {
        Optional<Seat> seatOpt = seatRepository.findByFlightIdAndSeatId(flightId, seatId);
        if (seatOpt.isPresent()) {
            Seat seat = seatOpt.get();
            if (seat.getStatus() == Seat.SeatStatus.LOCKED) {
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
                seat.setLockExpiry(null);
                seatRepository.save(seat);
                return true;
            }
        }
        return false;
    }

    public boolean bookSeat(Long flightId, String seatId) {
        Optional<Seat> seatOpt = seatRepository.findByFlightIdAndSeatId(flightId, seatId);
        if (seatOpt.isPresent()) {
            Seat seat = seatOpt.get();
            if (seat.getStatus() == Seat.SeatStatus.LOCKED) {
                seat.setStatus(Seat.SeatStatus.BOOKED);
                seat.setLockExpiry(null);
                seatRepository.save(seat);
                return true;
            }
        }
        return false;
    }
}