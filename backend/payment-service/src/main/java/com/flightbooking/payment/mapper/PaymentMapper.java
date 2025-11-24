package com.flightbooking.payment.mapper;

import com.flightbooking.payment.entity.Payment;
import com.flightbooking.payment.dto.PaymentDTO;

public class PaymentMapper {
    public static PaymentDTO toDTO(Payment payment) {
        if (payment == null) {
            return null;
        }
        
        return new PaymentDTO(
                payment.getId(),
                payment.getTransactionRef(),
                payment.getBookingId(),
                payment.getStatus(),
                payment.getProvider(),
                payment.getAmount(),
                payment.getCurrency()
        );
    }
    
    public static Payment toEntity(PaymentDTO paymentDTO) {
        if (paymentDTO == null) {
            return null;
        }
        
        return new Payment(
                paymentDTO.getTransactionRef(),
                paymentDTO.getBookingId(),
                paymentDTO.getStatus(),
                paymentDTO.getProvider(),
                paymentDTO.getAmount(),
                paymentDTO.getCurrency()
        );
    }
}