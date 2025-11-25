import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Dream Flight</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find the best flights at the most competitive prices. Experience seamless booking with our advanced seat selection system.
          </p>
          <Link to="/search" className="btn-primary text-lg px-8 py-3">
            Search Flights
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FlightBooking?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-6">
              <div className="text-4xl text-primary-600 mb-4">✈️</div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We guarantee the best prices on all flights. If you find a lower price elsewhere, we'll match it.
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-4xl text-primary-600 mb-4">💺</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Seat Selection</h3>
              <p className="text-gray-600">
                Choose your seat in real-time with our interactive seat map. See availability as it updates.
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="text-4xl text-primary-600 mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                Your payment and personal information are protected with industry-leading security measures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Flights</h3>
              <p className="text-gray-600">
                Enter your travel details to find available flights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Flight</h3>
              <p className="text-gray-600">
                Choose the best flight option for your travel needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Seats</h3>
              <p className="text-gray-600">
                Select your preferred seats with real-time availability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirm Booking</h3>
              <p className="text-gray-600">
                Complete your booking and receive instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have booked their flights with us.
          </p>
          <Link to="/search" className="btn-secondary text-lg px-8 py-3">
            Start Booking Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;