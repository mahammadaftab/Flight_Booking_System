package com.flightbooking.payment.dto;

import com.flightbooking.payment.entity.Payment;

import java.math.BigDecimal;

public class PaymentDTO {
    private Long id;
    private String transactionRef;
    private Long bookingId;
    private Payment.PaymentStatus status;
    private String provider;
    private BigDecimal amount;
    private String currency;

    // Constructors
    public PaymentDTO() {}

    public PaymentDTO(Long id, String transactionRef, Long bookingId, Payment.PaymentStatus status, String provider, BigDecimal amount, String currency) {
        this.id = id;
        this.transactionRef = transactionRef;
        this.bookingId = bookingId;
        this.status = status;
        this.provider = provider;
        this.amount = amount;
        this.currency = currency;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionRef() {
        return transactionRef;
    }

    public void setTransactionRef(String transactionRef) {
        this.transactionRef = transactionRef;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Payment.PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(Payment.PaymentStatus status) {
        this.status = status;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
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
}