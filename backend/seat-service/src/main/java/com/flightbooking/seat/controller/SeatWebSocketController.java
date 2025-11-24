package com.flightbooking.seat.controller;

import com.flightbooking.seat.message.SeatMessage;
import com.flightbooking.seat.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SeatWebSocketController {

    @Autowired
    private SeatService seatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/lockSeat")
    @SendTo("/topic/seats")
    public SeatMessage lockSeat(@Payload SeatMessage seatMessage) {
        boolean success = seatService.lockSeat(seatMessage.getFlightId(), seatMessage.getSeatId());
        if (success) {
            seatMessage.setStatus("LOCKED");
        } else {
            seatMessage.setStatus("LOCK_FAILED");
        }
        return seatMessage;
    }

    @MessageMapping("/unlockSeat")
    @SendTo("/topic/seats")
    public SeatMessage unlockSeat(@Payload SeatMessage seatMessage) {
        boolean success = seatService.unlockSeat(seatMessage.getFlightId(), seatMessage.getSeatId());
        if (success) {
            seatMessage.setStatus("AVAILABLE");
        } else {
            seatMessage.setStatus("UNLOCK_FAILED");
        }
        return seatMessage;
    }

    @MessageMapping("/bookSeat")
    @SendTo("/topic/seats")
    public SeatMessage bookSeat(@Payload SeatMessage seatMessage) {
        boolean success = seatService.bookSeat(seatMessage.getFlightId(), seatMessage.getSeatId());
        if (success) {
            seatMessage.setStatus("BOOKED");
        } else {
            seatMessage.setStatus("BOOK_FAILED");
        }
        return seatMessage;
    }
}