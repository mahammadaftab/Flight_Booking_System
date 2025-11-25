import api from './api';

class BookingService {
  // Get all bookings for a user
  getUserBookings(userId) {
    return api.get(`/api/bookings/user/${userId}`);
  }

  // Get booking by ID
  getBookingById(bookingId) {
    return api.get(`/api/bookings/${bookingId}`);
  }

  // Create a new booking
  createBooking(bookingData) {
    return api.post('/api/bookings', bookingData);
  }

  // Update a booking
  updateBooking(bookingId, bookingData) {
    return api.put(`/api/bookings/${bookingId}`, bookingData);
  }

  // Delete a booking
  deleteBooking(bookingId) {
    return api.delete(`/api/bookings/${bookingId}`);
  }

  // Get booking summary
  getBookingSummary(userId) {
    return api.get(`/api/bookings/user/${userId}/summary`);
  }
}

export default new BookingService();