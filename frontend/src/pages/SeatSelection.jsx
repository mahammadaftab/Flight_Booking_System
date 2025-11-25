import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import seatService from '../services/seatService';

const SeatSelection = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { 
    bookingData, 
    setSelectedSeat, 
    lockSeat, 
    bookSeat 
  } = useBooking();
  
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSeats();
    
    // Connect to WebSocket for real-time updates
    seatService.connectToSeatUpdates(flightId, handleSeatUpdate);
    
    // Cleanup on unmount
    return () => {
      seatService.disconnect();
    };
  }, [flightId]);

  const fetchSeats = async () => {
    try {
      const response = await seatService.getSeatsByFlightId(flightId);
      setSeats(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load seats');
      setLoading(false);
    }
  };

  const handleSeatUpdate = (seatUpdate) => {
    // Update the seat status in real-time
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatUpdate.id 
          ? { ...seat, status: seatUpdate.status }
          : seat
      )
    );
  };

  const handleSeatClick = async (seat) => {
    // Don't allow selection of already booked or locked seats
    if (seat.status === 'BOOKED' || seat.status === 'LOCKED') {
      return;
    }
    
    // If there's already a selected seat, unlock it first
    if (selectedSeatId) {
      const prevSeat = seats.find(s => s.id === selectedSeatId);
      if (prevSeat && prevSeat.status === 'LOCKED') {
        try {
          await seatService.unlockSeat(flightId, prevSeat.seatId);
        } catch (err) {
          console.error('Failed to unlock previous seat:', err);
        }
      }
    }
    
    // Lock the new seat
    const result = await lockSeat(flightId, seat.seatId);
    if (result.success) {
      setSelectedSeatId(seat.id);
      setSelectedSeat(seat);
    } else {
      alert(result.error || 'Failed to lock seat');
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedSeatId) {
      alert('Please select a seat first');
      return;
    }
    
    setProcessing(true);
    
    try {
      const result = await bookSeat(flightId, bookingData.selectedSeat.seatId);
      if (result.success) {
        navigate('/booking/confirmation');
      } else {
        alert(result.error || 'Failed to book seat');
      }
    } catch (err) {
      alert('Failed to confirm booking');
    } finally {
      setProcessing(false);
    }
  };

  const getSeatClass = (seat) => {
    let classes = "w-8 h-8 flex items-center justify-center rounded cursor-pointer border ";
    
    switch (seat.status) {
      case 'AVAILABLE':
        classes += selectedSeatId === seat.id 
          ? "bg-primary-600 text-white border-primary-600" 
          : "bg-white border-gray-300 hover:bg-gray-100";
        break;
      case 'LOCKED':
        classes += "bg-yellow-500 text-white border-yellow-500 cursor-not-allowed";
        break;
      case 'BOOKED':
        classes += "bg-red-500 text-white border-red-500 cursor-not-allowed";
        break;
      default:
        classes += "bg-gray-200 border-gray-300 cursor-not-allowed";
    }
    
    return classes;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading seats...</p>
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
                onClick={fetchSeats}
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

  // Group seats by row for display
  const seatRows = {};
  seats.forEach(seat => {
    if (!seatRows[seat.row]) {
      seatRows[seat.row] = [];
    }
    seatRows[seat.row].push(seat);
  });

  // Sort rows
  const sortedRows = Object.keys(seatRows).sort();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Select Your Seat</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Seat Map</h2>
                
                {/* Seat Legend */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border border-gray-300 mr-2"></div>
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary-600 border border-primary-600 mr-2"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 border border-yellow-500 mr-2"></div>
                    <span className="text-sm">Locked</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 border border-red-500 mr-2"></div>
                    <span className="text-sm">Booked</span>
                  </div>
                </div>
                
                {/* Seat Map */}
                <div className="overflow-x-auto">
                  <div className="min-w-max">
                    {sortedRows.map(row => (
                      <div key={row} className="flex items-center mb-2">
                        <div className="w-8 text-center font-medium mr-2">{row}</div>
                        <div className="flex gap-1">
                          {seatRows[row]
                            .sort((a, b) => a.column.localeCompare(b.column))
                            .map(seat => (
                              <div
                                key={seat.id}
                                className={getSeatClass(seat)}
                                onClick={() => handleSeatClick(seat)}
                                title={`Seat ${seat.seatId} - $${seat.price}`}
                              >
                                {seat.column}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              {bookingData.selectedSeat ? (
                <div>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Selected Seat</h3>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">{bookingData.selectedSeat.seatId}</div>
                      <div className="text-gray-600">${bookingData.selectedSeat.price}</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Seat Price:</span>
                      <span>${bookingData.selectedSeat.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes & Fees:</span>
                      <span>$45.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span>${(parseFloat(bookingData.selectedSeat.price) + 45).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleConfirmBooking}
                    disabled={processing || !selectedSeatId}
                    className="btn-primary w-full mt-6"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center">
                        <span className="loading-spinner mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Select a seat to view booking details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;