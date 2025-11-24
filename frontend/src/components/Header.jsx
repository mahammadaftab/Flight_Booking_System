import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  
  useEffect(() => {
    // Check if user is logged in (in a real app, this would come from authentication context)
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    
    // Check if user is admin (in a real app, this would come from user role)
    // For now, we'll simulate this
    setIsAdmin(true) // Simulate admin access for demo
  }, [location])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setIsAdmin(false)
    window.location.href = '/'
  }
  
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>FlightBooking</h1>
        </Link>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Flights</Link></li>
            {isLoggedIn ? (
              <>
                {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header