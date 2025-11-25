import React, { useState, useEffect } from 'react';
import flightService from '../services/flightService';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [flightData, setFlightData] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    aircraftType: '',
    price: '',
    class: 'ECONOMY'
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await flightService.getAllFlights();
      setFlights(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch flights');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await flightService.createFlight(flightData);
      setFlights([...flights, response.data]);
      setFlightData({
        airline: '',
        flightNumber: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        aircraftType: '',
        price: '',
        class: 'ECONOMY'
      });
      setShowAddForm(false);
    } catch (err) {
      setError(err.message || 'Failed to create flight');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await flightService.deleteFlight(id);
        setFlights(flights.filter(flight => flight.id !== id));
      } catch (err) {
        setError(err.message || 'Failed to delete flight');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading dashboard...</p>
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
                onClick={fetchFlights}
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            {showAddForm ? 'Cancel' : 'Add New Flight'}
          </button>
        </div>
        
        {showAddForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Flight</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                <input
                  type="text"
                  name="airline"
                  value={flightData.airline}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                <input
                  type="text"
                  name="flightNumber"
                  value={flightData.flightNumber}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  name="from"
                  value={flightData.from}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  name="to"
                  value={flightData.to}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                <input
                  type="time"
                  name="departureTime"
                  value={flightData.departureTime}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={flightData.arrivalTime}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={flightData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 7h 15m"
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aircraft Type</label>
                <input
                  type="text"
                  name="aircraftType"
                  value={flightData.aircraftType}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={flightData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="class"
                  value={flightData.class}
                  onChange={handleInputChange}
                  className="form-input w-full"
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Flight
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Flight Management</h2>
          
          {flights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No flights found. Add a new flight to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {flights.map((flight) => (
                    <tr key={flight.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{flight.airline}</div>
                        <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{flight.from}</div>
                        <div className="text-sm text-gray-500">{flight.to}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{flight.departureTime}</div>
                        <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
                        <div className="text-sm text-gray-500">({flight.duration})</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {flight.aircraftType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${flight.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(flight.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;