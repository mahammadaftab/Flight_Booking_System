import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlights } from '../contexts/FlightContext';

const FlightResults = () => {
  const navigate = useNavigate();
  const { flights, loading, error, getAllFlights } = useFlights();

  useEffect(() => {
    // Load all flights if none are available
    if (flights.length === 0) {
      getAllFlights();
    }
  }, [flights.length, getAllFlights]);

  const handleSelectFlight = (flightId) => {
    navigate(`/seats/${flightId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading flights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="alert-error">
              <p>{error}</p>
              <button 
                onClick={getAllFlights}
                className="btn-primary mt-4"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Available Flights</h1>
        
        {flights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">No flights found for your search criteria.</p>
            <button 
              onClick={() => navigate('/search')}
              className="btn-primary"
            >
              Search Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {flights.map((flight) => (
              <div key={flight.id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl font-bold mr-4">{flight.airline}</div>
                      <div className="text-gray-600">{flight.flightNumber}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.departureTime}</div>
                        <div className="text-gray-600">{flight.from}</div>
                      </div>
                      
                      <div className="flex-1 mx-4 relative">
                        <div className="border-t border-gray-300 my-2"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-600">
                          {flight.duration}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                        <div className="text-gray-600">{flight.to}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                        {flight.aircraftType}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                        {flight.class}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 md:text-right">
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      ${flight.price}
                    </div>
                    <button
                      onClick={() => handleSelectFlight(flight.id)}
                      className="btn-primary"
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;