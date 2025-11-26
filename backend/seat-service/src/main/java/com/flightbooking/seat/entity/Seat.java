package com.flightbooking.seat.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "seats")
public class Seat {
    public enum SeatStatus {
        AVAILABLE, LOCKED, BOOKED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "seat_id")
    private String seatId;

    @NotBlank
    private String className;

    @NotBlank
    @Column(name = "seat_row")
    private String row;

    @NotBlank
    @Column(name = "seat_column")
    private String column;

    @Enumerated(EnumType.STRING)
    @NotNull
    private SeatStatus status;

    @Column(name = "lock_expiry")
    private LocalDateTime lockExpiry;

    @NotNull
    @Column(name = "flight_id")
    private Long flightId;

    // Constructors
    public Seat() {}

    public Seat(String seatId, String className, String row, String column, SeatStatus status, LocalDateTime lockExpiry, Long flightId) {
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

    public SeatStatus getStatus() {
        return status;
    }

    public void setStatus(SeatStatus status) {
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