package com.flightbooking.seat.dto;

import com.flightbooking.seat.entity.Seat;

import java.time.LocalDateTime;

public class SeatDTO {
    private Long id;
    private String seatId;
    private String className;
    private String row;
    private String column;
    private Seat.SeatStatus status;
    private LocalDateTime lockExpiry;
    private Long flightId;

    // Constructors
    public SeatDTO() {}

    public SeatDTO(Long id, String seatId, String className, String row, String column, Seat.SeatStatus status, LocalDateTime lockExpiry, Long flightId) {
        this.id = id;
        this.seatId = seatId;
        this.className = className;
        this.row = row;
        this.column = column;
        this.status = status;
        this.lockExpiry = lockExpiry;
        this.flightId = flightId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public Seat.SeatStatus getStatus() {
        return status;
    }

    public void setStatus(Seat.SeatStatus status) {
        this.status = status;
    }

    public LocalDateTime getLockExpiry() {
        return lockExpiry;
    }

    public void setLockExpiry(LocalDateTime lockExpiry) {
        this.lockExpiry = lockExpiry;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }
}