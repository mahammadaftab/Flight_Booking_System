package com.flightbooking.payment.service;

import com.flightbooking.payment.entity.Payment;
import com.flightbooking.payment.repository.PaymentRepository;
import com.flightbooking.payment.dto.PaymentDTO;
import com.flightbooking.payment.mapper.PaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(PaymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PaymentDTO> getPaymentById(Long id) {
        return paymentRepository.findById(id).map(PaymentMapper::toDTO);
    }

    public Optional<PaymentDTO> getPaymentByTransactionRef(String transactionRef) {
        return paymentRepository.findByTransactionRef(transactionRef).map(PaymentMapper::toDTO);
    }

    public Optional<PaymentDTO> getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId).map(PaymentMapper::toDTO);
    }

    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Payment payment = PaymentMapper.toEntity(paymentDTO);
        Payment savedPayment = paymentRepository.save(payment);
        return PaymentMapper.toDTO(savedPayment);
    }

    public PaymentDTO updatePayment(Long id, PaymentDTO paymentDTO) {
        if (paymentRepository.existsById(id)) {
            Payment payment = PaymentMapper.toEntity(paymentDTO);
            payment.setId(id);
            Payment savedPayment = paymentRepository.save(payment);
            return PaymentMapper.toDTO(savedPayment);
        }
        return null;
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    public PaymentDTO initPayment(Long bookingId, BigDecimal amount, String currency, String provider) {
        // Generate a unique transaction reference
        String transactionRef = "TXN" + UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
        
        Payment payment = new Payment(transactionRef, bookingId, Payment.PaymentStatus.PENDING, provider, amount, currency);
        Payment savedPayment = paymentRepository.save(payment);
        return PaymentMapper.toDTO(savedPayment);
    }

    public boolean processPayment(String transactionRef) {
        Optional<Payment> paymentOpt = paymentRepository.findByTransactionRef(transactionRef);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setStatus(Payment.PaymentStatus.SUCCESS);
            paymentRepository.save(payment);
            return true;
        }
        return false;
    }

    public boolean refundPayment(String transactionRef) {
        Optional<Payment> paymentOpt = paymentRepository.findByTransactionRef(transactionRef);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setStatus(Payment.PaymentStatus.REFUNDED);
            paymentRepository.save(payment);
            return true;
        }
        return false;
    }
}