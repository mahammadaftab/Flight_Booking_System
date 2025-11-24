import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './FlightResults.css'

const FlightResults = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const searchData = location.state || {}
  
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)
        // In a real application, we would call the flight service API here
        // For now, we'll use mock data
        const mockFlights = [
          {
            id: 1,
            airline: 'American Airlines',
            flightNumber: 'AA101',
            origin: 'JFK',
            destination: 'LAX',
            departureUtc: '2026-01-10T08:00:00',
            arrivalUtc: '2026-01-10T11:30:00',
            aircraftType: 'Boeing 737',
            price: 299.99
          },
          {
            id: 2,
            airline: 'Delta Airlines',
            flightNumber: 'DL202',
            origin: 'JFK',
            destination: 'LAX',
            departureUtc: '2026-01-10T14:00:00',
            arrivalUtc: '2026-01-10T17:30:00',
            aircraftType: 'Airbus A320',
            price: 349.99
          },
          {
            id: 3,
            airline: 'United Airlines',
            flightNumber: 'UA303',
            origin: 'JFK',
            destination: 'LAX',
            departureUtc: '2026-01-10T19:00:00',
            arrivalUtc: '2026-01-10T22:30:00',
            aircraftType: 'Boeing 787',
            price: 429.99
          }
        ]
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setFlights(mockFlights)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch flights')
        setLoading(false)
      }
    }
    
    if (searchData.from && searchData.to && searchData.date) {
      fetchFlights()
    } else {
      navigate('/search')
    }
  }, [searchData, navigate])
  
  const handleSelectFlight = (flightId) => {
    navigate(`/seats/${flightId}`)
  }
  
  if (loading) {
    return (
      <div className="flight-results">
        <div className="container">
          <h1>Searching Flights...</h1>
          <div className="loading">Loading flights...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flight-results">
        <div className="container">
          <h1>Flight Search</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flight-results">
      <div className="container">
        <h1>Flight Results</h1>
        <div className="search-summary">
          <p>{searchData.from} → {searchData.to} | {searchData.date} | {searchData.adults} Adult(s)</p>
        </div>
        
        <div className="flights-list">
          {flights.length === 0 ? (
            <div className="no-results">
              <p>No flights found for your search criteria.</p>
            </div>
          ) : (
            flights.map(flight => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="airline-info">
                    <h3>{flight.airline}</h3>
                    <p>{flight.flightNumber}</p>
                  </div>
                  <div className="route-info">
                    <div className="departure">
                      <p className="time">{new Date(flight.departureUtc).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      <p className="airport">{flight.origin}</p>
                    </div>
                    <div className="duration">
                      <p>—</p>
                    </div>
                    <div className="arrival">
                      <p className="time">{new Date(flight.arrivalUtc).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      <p className="airport">{flight.destination}</p>
                    </div>
                  </div>
                  <div className="aircraft-info">
                    <p>{flight.aircraftType}</p>
                  </div>
                </div>
                <div className="flight-price">
                  <p className="price">{searchData.currency} {flight.price.toFixed(2)}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleSelectFlight(flight.id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FlightResults