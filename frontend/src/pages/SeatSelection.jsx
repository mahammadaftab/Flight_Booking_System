import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import './SeatSelection.css'

const SeatSelection = () => {
  const { flightId } = useParams()
  const navigate = useNavigate()
  
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const stompClientRef = useRef(null)
  
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true)
        // In a real application, we would call the seat service API here
        // For now, we'll use mock data
        const mockSeats = [
          { id: 1, seatId: '1A', className: 'Economy', row: '1', column: 'A', status: 'AVAILABLE' },
          { id: 2, seatId: '1B', className: 'Economy', row: '1', column: 'B', status: 'AVAILABLE' },
          { id: 3, seatId: '1C', className: 'Economy', row: '1', column: 'C', status: 'AVAILABLE' },
          { id: 4, seatId: '1D', className: 'Economy', row: '1', column: 'D', status: 'AVAILABLE' },
          { id: 5, seatId: '1E', className: 'Economy', row: '1', column: 'E', status: 'AVAILABLE' },
          { id: 6, seatId: '1F', className: 'Economy', row: '1', column: 'F', status: 'AVAILABLE' },
          { id: 7, seatId: '2A', className: 'Economy', row: '2', column: 'A', status: 'AVAILABLE' },
          { id: 8, seatId: '2B', className: 'Economy', row: '2', column: 'B', status: 'AVAILABLE' },
          { id: 9, seatId: '2C', className: 'Economy', row: '2', column: 'C', status: 'AVAILABLE' },
          { id: 10, seatId: '2D', className: 'Economy', row: '2', column: 'D', status: 'AVAILABLE' },
          { id: 11, seatId: '2E', className: 'Economy', row: '2', column: 'E', status: 'AVAILABLE' },
          { id: 12, seatId: '2F', className: 'Economy', row: '2', column: 'F', status: 'AVAILABLE' },
          { id: 13, seatId: '3A', className: 'Business', row: '3', column: 'A', status: 'AVAILABLE' },
          { id: 14, seatId: '3B', className: 'Business', row: '3', column: 'B', status: 'AVAILABLE' },
          { id: 15, seatId: '3C', className: 'Business', row: '3', column: 'C', status: 'AVAILABLE' },
          { id: 16, seatId: '3D', className: 'Business', row: '3', column: 'D', status: 'AVAILABLE' }
        ]
        
        setSeats(mockSeats)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch seats')
        setLoading(false)
      }
    }
    
    fetchSeats()
    
    // Connect to WebSocket for real-time seat updates
    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:8080/api/seats/ws-seats')
      const client = Stomp.over(socket)
      
      client.connect({}, () => {
        console.log('Connected to WebSocket')
        
        client.subscribe('/topic/seats', (message) => {
          try {
            const seatUpdate = JSON.parse(message.body)
            console.log('Received seat update:', seatUpdate)
            
            setSeats(prevSeats => 
              prevSeats.map(seat => 
                seat.seatId === seatUpdate.seatId 
                  ? { ...seat, status: seatUpdate.status } 
                  : seat
              )
            )
          } catch (err) {
            console.error('Error processing seat update:', err)
          }
        })
      }, (error) => {
        console.error('WebSocket connection error:', error)
      })
      
      stompClientRef.current = client
    }
    
    connectWebSocket()
    
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect()
      }
    }
  }, [flightId])
  
  const handleSeatClick = (seat) => {
    if (seat.status === 'AVAILABLE') {
      // Send message to lock the seat via WebSocket
      if (stompClientRef.current && stompClientRef.current.connected) {
        const seatMessage = {
          seatId: seat.seatId,
          status: 'LOCKED',
          flightId: parseInt(flightId)
        }
        
        stompClientRef.current.send('/app/lockSeat', {}, JSON.stringify(seatMessage))
        
        // Update local state immediately for better UX
        setSeats(prevSeats => 
          prevSeats.map(s => 
            s.seatId === seat.seatId 
              ? { ...s, status: 'LOCKED' } 
              : s
          )
        )
        
        setSelectedSeats(prev => [...prev, seat.seatId])
      }
    } else if (seat.status === 'LOCKED' && selectedSeats.includes(seat.seatId)) {
      // Send message to unlock the seat via WebSocket
      if (stompClientRef.current && stompClientRef.current.connected) {
        const seatMessage = {
          seatId: seat.seatId,
          status: 'AVAILABLE',
          flightId: parseInt(flightId)
        }
        
        stompClientRef.current.send('/app/unlockSeat', {}, JSON.stringify(seatMessage))
        
        // Update local state immediately for better UX
        setSeats(prevSeats => 
          prevSeats.map(s => 
            s.seatId === seat.seatId 
              ? { ...s, status: 'AVAILABLE' } 
              : s
          )
        )
        
        setSelectedSeats(prev => prev.filter(id => id !== seat.seatId))
      }
    }
  }
  
  const handleConfirmBooking = () => {
    if (selectedSeats.length > 0) {
      // In a real application, we would call the booking service API here
      navigate('/confirmation', { state: { flightId, selectedSeats } })
    }
  }
  
  if (loading) {
    return (
      <div className="seat-selection">
        <div className="container">
          <h1>Select Your Seats</h1>
          <div className="loading">Loading seats...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="seat-selection">
        <div className="container">
          <h1>Select Your Seats</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="seat-selection">
      <div className="container">
        <h1>Select Your Seats</h1>
        <div className="seat-map">
          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat locked"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat booked"></div>
              <span>Booked</span>
            </div>
          </div>
          
          <div className="seats-container">
            {seats.map(seat => (
              <div
                key={seat.id}
                className={`seat ${seat.status.toLowerCase()} ${selectedSeats.includes(seat.seatId) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.seatId}
              </div>
            ))}
          </div>
        </div>
        
        <div className="selection-summary">
          <h2>Selected Seats</h2>
          <div className="selected-seats">
            {selectedSeats.length > 0 ? (
              selectedSeats.map(seatId => (
                <span key={seatId} className="selected-seat">{seatId}</span>
              ))
            ) : (
              <p>No seats selected</p>
            )}
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection