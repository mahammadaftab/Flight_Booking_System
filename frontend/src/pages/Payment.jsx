import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Payment.css'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { bookingData } = location.state || {}
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit'
  })
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  
  useEffect(() => {
    if (!bookingData) {
      navigate('/search')
    }
  }, [bookingData, navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // In a real application, we would integrate with a payment provider like Stripe
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful payment
      setPaymentSuccess(true)
      
      // Redirect to confirmation page after a delay
      setTimeout(() => {
        navigate('/confirmation', { state: { bookingData, paymentSuccess: true } })
      }, 3000)
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (paymentSuccess) {
    return (
      <div className="payment">
        <div className="container">
          <div className="payment-card">
            <h1>Processing Payment...</h1>
            <div className="success-message">
              <p>Your payment is being processed. You will be redirected shortly.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="payment">
      <div className="container">
        <div className="payment-card">
          <h1>Payment Details</h1>
          
          {bookingData && (
            <div className="booking-summary">
              <h2>Booking Summary</h2>
              <div className="summary-item">
                <span>Flight:</span>
                <span>{bookingData.flightId}</span>
              </div>
              <div className="summary-item">
                <span>Seats:</span>
                <span>{bookingData.seats.join(', ')}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>{bookingData.currency} {bookingData.amount.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleChange}
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            
            {(paymentData.paymentMethod === 'credit' || paymentData.paymentMethod === 'debit') && (
              <>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            {paymentData.paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing Payment...' : `Pay ${bookingData ? bookingData.currency + ' ' + bookingData.amount.toFixed(2) : ''}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Payment