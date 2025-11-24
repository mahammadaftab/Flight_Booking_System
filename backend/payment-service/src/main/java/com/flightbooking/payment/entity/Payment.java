package com.flightbooking.payment.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
public class Payment {
    public enum PaymentStatus {
        PENDING, SUCCESS, FAILED, REFUNDED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String transactionRef;

    @NotNull
    @Column(name = "booking_id")
    private Long bookingId;

    @Enumerated(EnumType.STRING)
    @NotNull
    private PaymentStatus status;

    @NotBlank
    private String provider;

    @NotNull
    private BigDecimal amount;

    @NotBlank
    private String currency;

    // Constructors
    public Payment() {}

    public Payment(String transactionRef, Long bookingId, PaymentStatus status, String provider, BigDecimal amount, String currency) {
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

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
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