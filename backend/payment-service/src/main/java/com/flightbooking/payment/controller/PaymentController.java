package com.flightbooking.payment.controller;

import com.flightbooking.payment.dto.PaymentDTO;
import com.flightbooking.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<PaymentDTO> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable Long id) {
        Optional<PaymentDTO> payment = paymentService.getPaymentById(id);
        return payment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/transaction/{transactionRef}")
    public ResponseEntity<PaymentDTO> getPaymentByTransactionRef(@PathVariable String transactionRef) {
        Optional<PaymentDTO> payment = paymentService.getPaymentByTransactionRef(transactionRef);
        return payment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentDTO> getPaymentByBookingId(@PathVariable Long bookingId) {
        Optional<PaymentDTO> payment = paymentService.getPaymentByBookingId(bookingId);
        return payment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PaymentDTO createPayment(@RequestBody PaymentDTO paymentDTO) {
        return paymentService.createPayment(paymentDTO);
    }

    @PostMapping("/init")
    public PaymentDTO initPayment(
            @RequestParam Long bookingId,
            @RequestParam BigDecimal amount,
            @RequestParam String currency,
            @RequestParam String provider) {
        return paymentService.initPayment(bookingId, amount, currency, provider);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentDTO> updatePayment(@PathVariable Long id, @RequestBody PaymentDTO paymentDTO) {
        PaymentDTO updatedPayment = paymentService.updatePayment(id, paymentDTO);
        if (updatedPayment != null) {
            return ResponseEntity.ok(updatedPayment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/process/{transactionRef}")
    public ResponseEntity<String> processPayment(@PathVariable String transactionRef) {
        boolean success = paymentService.processPayment(transactionRef);
        if (success) {
            return ResponseEntity.ok("Payment processed successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to process payment");
        }
    }

    @PostMapping("/refund/{transactionRef}")
    public ResponseEntity<String> refundPayment(@PathVariable String transactionRef) {
        boolean success = paymentService.refundPayment(transactionRef);
        if (success) {
            return ResponseEntity.ok("Payment refunded successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to refund payment");
        }
    }
}