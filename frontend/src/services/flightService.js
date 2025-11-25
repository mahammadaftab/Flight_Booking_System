import api from './api';

class FlightService {
  // Get all flights
  getAllFlights() {
    return api.get('/api/flights');
  }

  // Get flight by ID
  getFlightById(id) {
    return api.get(`/api/flights/${id}`);
  }

  // Search flights
  searchFlights(from, to, date) {
    return api.get('/api/flights/search', {
      params: { from, to, date }
    });
  }

  // Create a new flight (admin only)
  createFlight(flightData) {
    return api.post('/api/flights', flightData);
  }

  // Update a flight (admin only)
  updateFlight(id, flightData) {
    return api.put(`/api/flights/${id}`, flightData);
  }

  // Delete a flight (admin only)
  deleteFlight(id) {
    return api.delete(`/api/flights/${id}`);
  }
}

export default new FlightService();