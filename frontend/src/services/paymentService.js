import api from './api';

class PaymentService {
  // Process a payment
  processPayment(paymentData) {
    return api.post('/api/payments/process', paymentData);
  }

  // Get payment by ID
  getPaymentById(paymentId) {
    return api.get(`/api/payments/${paymentId}`);
  }

  // Get payments by booking ID
  getPaymentsByBookingId(bookingId) {
    return api.get(`/api/payments/booking/${bookingId}`);
  }

  // Refund a payment
  refundPayment(paymentId, refundData) {
    return api.post(`/api/payments/${paymentId}/refund`, refundData);
  }

  // Get payment methods
  getPaymentMethods() {
    return api.get('/api/payments/methods');
  }
}

export default new PaymentService();