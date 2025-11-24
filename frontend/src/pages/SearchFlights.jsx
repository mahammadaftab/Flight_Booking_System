import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SearchFlights.css'

const SearchFlights = () => {
  const navigate = useNavigate()
  
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    adults: 1,
    children: 0,
    currency: 'USD'
  })
  
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'AUD'])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData(prev => ({
      ...prev,
      [name]: name === 'adults' || name === 'children' ? parseInt(value) : value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // In a real application, we would call the flight service API here
      // For now, we'll just navigate to the results page
      navigate('/results', { state: searchData })
    } catch (error) {
      console.error('Error searching flights:', error)
    }
  }
  
  return (
    <div className="search-flights">
      <div className="container">
        <h1>Search Flights</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              value={searchData.from}
              onChange={handleChange}
              placeholder="Airport code or city"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              value={searchData.to}
              onChange={handleChange}
              placeholder="Airport code or city"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Departure Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={searchData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="adults">Adults</label>
            <select
              id="adults"
              name="adults"
              value={searchData.adults}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="children">Children</label>
            <select
              id="children"
              name="children"
              value={searchData.children}
              onChange={handleChange}
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={searchData.currency}
              onChange={handleChange}
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">Search Flights</button>
        </form>
      </div>
    </div>
  )
}

export default SearchFlights