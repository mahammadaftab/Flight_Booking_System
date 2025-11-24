package com.flightbooking.booking.dto;

import com.flightbooking.booking.entity.Booking;

import java.math.BigDecimal;
import java.util.List;

public class BookingDTO {
    private Long id;
    private String pnr;
    private Long userId;
    private Long flightId;
    private List<String> seats;
    private BigDecimal amount;
    private String currency;
    private Booking.BookingStatus status;

    // Constructors
    public BookingDTO() {}

    public BookingDTO(Long id, String pnr, Long userId, Long flightId, List<String> seats, BigDecimal amount, String currency, Booking.BookingStatus status) {
        this.id = id;
        this.pnr = pnr;
        this.userId = userId;
        this.flightId = flightId;
        this.seats = seats;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPnr() {
        return pnr;
    }

    public void setPnr(String pnr) {
        this.pnr = pnr;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Booking.BookingStatus getStatus() {
        return status;
    }

    public void setStatus(Booking.BookingStatus status) {
        this.status = status;
    }
}