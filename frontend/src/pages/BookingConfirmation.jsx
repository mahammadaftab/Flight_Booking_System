import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './BookingConfirmation.css'

const BookingConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { flightId, selectedSeats } = location.state || {}
  
  useEffect(() => {
    const createBooking = async () => {
      try {
        setLoading(true)
        // In a real application, we would call the booking service API here
        // For now, we'll use mock data
        const mockBooking = {
          id: 1,
          pnr: 'ABC123',
          flightId: flightId,
          seats: selectedSeats,
          amount: 299.99,
          currency: 'USD',
          status: 'CONFIRMED'
        }
        
        setBookingData(mockBooking)
        setLoading(false)
      } catch (err) {
        setError('Failed to create booking')
        setLoading(false)
      }
    }
    
    if (flightId && selectedSeats) {
      createBooking()
    } else {
      navigate('/search')
    }
  }, [flightId, selectedSeats, navigate])
  
  const handlePayment = () => {
    // Redirect to payment page with booking data
    navigate('/payment', { state: { bookingData } })
  }
  
  if (loading) {
    return (
      <div className="booking-confirmation">
        <div className="container">
          <h1>Confirming Booking...</h1>
          <div className="loading">Processing your booking...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="booking-confirmation">
        <div className="container">
          <h1>Booking Confirmation</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="booking-confirmation">
      <div className="container">
        <h1>Booking Confirmation</h1>
        {bookingData && (
          <div className="confirmation-card">
            <div className="confirmation-header">
              <h2>Booking Confirmed!</h2>
              <p className="pnr">PNR: {bookingData.pnr}</p>
            </div>
            
            <div className="booking-details">
              <div className="detail-item">
                <h3>Flight Details</h3>
                <p>American Airlines AA101</p>
                <p>JFK → LAX</p>
                <p>Jan 10, 2026 | 08:00 AM</p>
              </div>
              
              <div className="detail-item">
                <h3>Selected Seats</h3>
                <div className="seats-list">
                  {bookingData.seats.map(seat => (
                    <span key={seat} className="seat-badge">{seat}</span>
                  ))}
                </div>
              </div>
              
              <div className="detail-item">
                <h3>Passenger Details</h3>
                <p>John Doe</p>
                <p>john.doe@example.com</p>
              </div>
              
              <div className="detail-item">
                <h3>Payment Summary</h3>
                <p className="amount">{bookingData.currency} {bookingData.amount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="confirmation-actions">
              <button className="btn btn-primary" onClick={handlePayment}>
                Proceed to Payment
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingConfirmation