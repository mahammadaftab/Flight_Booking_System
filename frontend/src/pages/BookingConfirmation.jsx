import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    navigate('/search');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">Your flight has been successfully booked.</p>
          </div>

          <div className="card p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">Booking Reference: FB123456</h2>
                <p className="text-gray-600">Booking date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  ${(parseFloat(bookingData.selectedSeat?.price || 0) + 45).toFixed(2)}
                </div>
                <p className="text-gray-600">Total paid</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Flight Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airline:</span>
                      <span className="font-medium">SkyWings Airlines</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight Number:</span>
                      <span className="font-medium">SW123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure:</span>
                      <span className="font-medium">10:30 AM, New York (JFK)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival:</span>
                      <span className="font-medium">1:45 PM, London (LHR)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Passenger Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">john.doe@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seat:</span>
                      <span className="font-medium">{bookingData.selectedSeat?.seatId || 'A1'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">Economy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Important Information</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Please arrive at the airport at least 2 hours before departure</li>
                <li>Check-in counters close 45 minutes before departure</li>
                <li>Your boarding pass will be available 24 hours before departure</li>
                <li>Baggage allowance: 1 checked bag (23kg) + 1 carry-on</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePrint}
              className="btn-outline px-6 py-3"
            >
              Print Booking
            </button>
            <button
              onClick={handleNewBooking}
              className="btn-primary px-6 py-3"
            >
              Book Another Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;