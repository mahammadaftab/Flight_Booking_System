package com.flightbooking.seat.message;

public class SeatMessage {
    private String seatId;
    private String status;
    private Long flightId;

    public SeatMessage() {}

    public SeatMessage(String seatId, String status, Long flightId) {
        this.seatId = seatId;
        this.status = status;
        this.flightId = flightId;
    }

    public String getSeatId() {
        return seatId;
    }

    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }
}