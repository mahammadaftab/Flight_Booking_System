import React, { createContext, useState, useContext } from 'react';
import bookingService from '../services/bookingService';
import seatService from '../services/seatService';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    flight: null,
    selectedSeat: null,
    passengerInfo: {},
    paymentInfo: {}
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBookingData = (data) => {
    setBookingData(prev => ({
      ...prev,
      ...data
    }));
  };

  const setSelectedSeat = (seat) => {
    setBookingData(prev => ({
      ...prev,
      selectedSeat: seat
    }));
  };

  const setPassengerInfo = (info) => {
    setBookingData(prev => ({
      ...prev,
      passengerInfo: info
    }));
  };

  const setPaymentInfo = (info) => {
    setBookingData(prev => ({
      ...prev,
      paymentInfo: info
    }));
  };

  const getUserBookings = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.getUserBookings(userId);
      setBookings(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      return { success: false, error: err.message || 'Failed to fetch bookings' };
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookingService.createBooking(bookingData);
      // Update the bookings list
      setBookings(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      return { success: false, error: err.message || 'Failed to create booking' };
    } finally {
      setLoading(false);
    }
  };

  const lockSeat = async (flightId, seatId) => {
    try {
      const response = await seatService.lockSeat(flightId, seatId);
      return { success: true, message: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to lock seat' };
    }
  };

  const bookSeat = async (flightId, seatId) => {
    try {
      const response = await seatService.bookSeat(flightId, seatId);
      return { success: true, message: response.data };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to book seat' };
    }
  };

  const value = {
    bookingData,
    bookings,
    loading,
    error,
    updateBookingData,
    setSelectedSeat,
    setPassengerInfo,
    setPaymentInfo,
    getUserBookings,
    createBooking,
    lockSeat,
    bookSeat
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;