import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  
  const [flights, setFlights] = useState([])
  const [airports, setAirports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [activeTab, setActiveTab] = useState('flights')
  
  useEffect(() => {
    // Check if user is admin (in a real app, this would come from authentication)
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    
    // Fetch data
    fetchData()
  }, [navigate])
  
  const fetchData = async () => {
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
          aircraftType: 'Boeing 737'
        },
        {
          id: 2,
          airline: 'British Airways',
          flightNumber: 'BA202',
          origin: 'LHR',
          destination: 'CDG',
          departureUtc: '2026-01-10T14:00:00',
          arrivalUtc: '2026-01-10T15:30:00',
          aircraftType: 'Airbus A320'
        }
      ]
      
      const mockAirports = [
        { id: 1, iata: 'JFK', icao: 'KJFK', name: 'John F Kennedy International Airport', city: 'New York', country: 'USA' },
        { id: 2, iata: 'LAX', icao: 'KLAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
        { id: 3, iata: 'LHR', icao: 'EGLL', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
        { id: 4, iata: 'CDG', icao: 'LFPG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' }
      ]
      
      setFlights(mockFlights)
      setAirports(mockAirports)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch data')
      setLoading(false)
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </button>
          <button 
            className={`tab ${activeTab === 'airports' ? 'active' : ''}`}
            onClick={() => setActiveTab('airports')}
          >
            Airports
          </button>
          <button 
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>
        
        <div className="admin-content">
          {activeTab === 'flights' && (
            <div className="flights-management">
              <div className="section-header">
                <h2>Flight Management</h2>
                <button className="btn btn-primary">Add New Flight</button>
              </div>
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Airline</th>
                    <th>Flight Number</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Aircraft</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map(flight => (
                    <tr key={flight.id}>
                      <td>{flight.airline}</td>
                      <td>{flight.flightNumber}</td>
                      <td>{flight.origin}</td>
                      <td>{flight.destination}</td>
                      <td>{new Date(flight.departureUtc).toLocaleString()}</td>
                      <td>{new Date(flight.arrivalUtc).toLocaleString()}</td>
                      <td>{flight.aircraftType}</td>
                      <td>
                        <button className="btn btn-small btn-secondary">Edit</button>
                        <button className="btn btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'airports' && (
            <div className="airports-management">
              <div className="section-header">
                <h2>Airport Management</h2>
                <button className="btn btn-primary">Add New Airport</button>
              </div>
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>IATA</th>
                    <th>ICAO</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {airports.map(airport => (
                    <tr key={airport.id}>
                      <td>{airport.iata}</td>
                      <td>{airport.icao}</td>
                      <td>{airport.name}</td>
                      <td>{airport.city}</td>
                      <td>{airport.country}</td>
                      <td>
                        <button className="btn btn-small btn-secondary">Edit</button>
                        <button className="btn btn-small btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'bookings' && (
            <div className="bookings-management">
              <div className="section-header">
                <h2>Booking Management</h2>
              </div>
              
              <div className="bookings-stats">
                <div className="stat-card">
                  <h3>Total Bookings</h3>
                  <p>1,245</p>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <p>$245,680</p>
                </div>
                <div className="stat-card">
                  <h3>Avg. Booking Value</h3>
                  <p>$197.33</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard