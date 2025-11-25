import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';

const Payment = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Payment details, 2: Review, 3: Confirmation

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Move to confirmation
    }, 2000);
  };

  const handleConfirm = () => {
    // In a real app, this would process the payment
    navigate('/booking/confirmation');
  };

  const totalPrice = parseFloat(bookingData.selectedSeat?.price || 0) + 45;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Payment</h1>
        
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span className="mt-2 text-sm">Payment Details</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span className="mt-2 text-sm">Review</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className="mt-2 text-sm">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card p-6">
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                
                {error && (
                  <div className="alert-error mb-6">
                    {error}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="form-input w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={paymentData.billingAddress}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className="form-input w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={paymentData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={paymentData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className="form-input w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={paymentData.country}
                      onChange={handleChange}
                      className="form-input w-full"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary"
                  >
                    Continue to Review
                  </button>
                </div>
              </form>
            )}
            
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Booking</h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Flight Details</h3>
                    <div className="flex justify-between">
                      <span>New York (JFK) → London (LHR)</span>
                      <span>10:30 AM - 1:45 PM</span>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Passenger</h3>
                    <div>John Doe</div>
                    <div>john.doe@example.com</div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h3 className="font-medium mb-2">Seat</h3>
                    <div className="flex justify-between">
                      <span>{bookingData.selectedSeat?.seatId || 'A1'}</span>
                      <span>${bookingData.selectedSeat?.price || '0.00'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex justify-between mb-2">
                      <span>Seat Price:</span>
                      <span>${bookingData.selectedSeat?.price || '0.00'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Taxes & Fees:</span>
                      <span>$45.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="btn-primary"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="loading-spinner w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
                <p className="text-gray-600 mb-6">Please wait while we process your payment...</p>
                
                <div className="bg-gray-50 p-4 rounded max-w-md mx-auto">
                  <div className="flex justify-between mb-2">
                    <span>Amount:</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Card:</span>
                    <span className="font-medium">•••• {paymentData.cardNumber.slice(-4)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;