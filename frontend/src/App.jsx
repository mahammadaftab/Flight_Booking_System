import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import SearchFlights from './pages/SearchFlights.jsx';
import FlightResults from './pages/FlightResults.jsx';
import SeatSelection from './pages/SeatSelection.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Payment from './pages/Payment.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { FlightProvider } from './contexts/FlightContext.jsx';
import { BookingProvider } from './contexts/BookingContext.jsx';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <AuthProvider>
      <FlightProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchFlights />} />
                <Route path="/results" element={<FlightResults />} />
                <Route path="/seats/:flightId" element={<SeatSelection />} />
                <Route path="/booking/confirmation" element={<BookingConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </FlightProvider>
    </AuthProvider>
  );
}

export default App;