import React, { createContext, useState, useContext } from 'react';
import flightService from '../services/flightService';

const FlightContext = createContext();

export const useFlights = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlights must be used within a FlightProvider');
  }
  return context;
};

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFlights = async (from, to, date) => {
    setLoading(true);
    setError(null);
    try {
      const response = await flightService.searchFlights(from, to, date);
      setFlights(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || 'Failed to search flights');
      return { success: false, error: err.message || 'Failed to search flights' };
    } finally {
      setLoading(false);
    }
  };

  const getAllFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await flightService.getAllFlights();
      setFlights(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || 'Failed to fetch flights');
      return { success: false, error: err.message || 'Failed to fetch flights' };
    } finally {
      setLoading(false);
    }
  };

  const getFlightById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await flightService.getFlightById(id);
      setSelectedFlight(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || 'Failed to fetch flight');
      return { success: false, error: err.message || 'Failed to fetch flight' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    flights,
    selectedFlight,
    setSelectedFlight,
    loading,
    error,
    searchFlights,
    getAllFlights,
    getFlightById
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContext;