import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Book Your Flight Anywhere in the World</h1>
          <p>Find the best deals on flights to over 10,000 destinations worldwide</p>
          <Link to="/search" className="btn btn-primary">Search Flights</Link>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Why Choose FlightBooking?</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>Global Coverage</h3>
              <p>Access to 10,000+ airports worldwide with real-time availability</p>
            </div>
            <div className="feature">
              <h3>Real-time Seat Selection</h3>
              <p>Choose your seat with live updates from other passengers</p>
            </div>
            <div className="feature">
              <h3>Multi-currency Support</h3>
              <p>Pay in your preferred currency with competitive exchange rates</p>
            </div>
            <div className="feature">
              <h3>Secure Payments</h3>
              <p>PCI-DSS compliant payment processing for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home