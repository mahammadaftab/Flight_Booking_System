import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlights } from '../contexts/FlightContext';

const SearchFlights = () => {
  const navigate = useNavigate();
  const { searchFlights, loading, error } = useFlights();
  
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchData.from || !searchData.to || !searchData.date) {
      alert('Please fill in all fields');
      return;
    }
    
    const result = await searchFlights(searchData.from, searchData.to, searchData.date);
    
    if (result.success) {
      navigate('/results');
    } else {
      alert(result.error || 'Failed to search flights');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Search Flights</h1>
          
          <div className="card p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="from" className="block text-gray-700 font-medium mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={searchData.from}
                    onChange={handleChange}
                    placeholder="Departure city or airport"
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="to" className="block text-gray-700 font-medium mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={searchData.to}
                    onChange={handleChange}
                    placeholder="Destination city or airport"
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={searchData.date}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="alert-error mb-6">
                  {error}
                </div>
              )}
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full md:w-auto px-8 py-3"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading-spinner mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Searching...
                    </span>
                  ) : (
                    'Search Flights'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setSearchData({...searchData, from: 'New York', to: 'London'})}
                className="btn-outline text-center py-3"
              >
                New York → London
              </button>
              <button 
                onClick={() => setSearchData({...searchData, from: 'Paris', to: 'Tokyo'})}
                className="btn-outline text-center py-3"
              >
                Paris → Tokyo
              </button>
              <button 
                onClick={() => setSearchData({...searchData, from: 'Sydney', to: 'Los Angeles'})}
                className="btn-outline text-center py-3"
              >
                Sydney → LA
              </button>
              <button 
                onClick={() => setSearchData({...searchData, from: 'Dubai', to: 'Singapore'})}
                className="btn-outline text-center py-3"
              >
                Dubai → Singapore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlights;