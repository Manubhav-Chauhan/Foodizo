import React, { useState } from 'react'

const Checkout = ({ cartItems, totalPrice, user, savedAddresses, onBack, onPlaceOrder, onScheduleOrder }) => {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || null)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [tip, setTip] = useState(0)
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [scheduleDelivery, setScheduleDelivery] = useState(false)
  const [scheduledTime, setScheduledTime] = useState('')
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    type: 'other',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const availableCoupons = [
    { code: 'SAVE50', discount: 50, minOrder: 300, description: '₹50 off on orders above ₹300' },
    { code: 'FIRST20', discount: 20, minOrder: 200, description: '20% off on first order' },
    { code: 'WEEKEND25', discount: 25, minOrder: 250, description: '₹25 off weekend special' }
  ]

  const deliveryFee = totalPrice > 200 ? 0 : 40
  const taxes = Math.round(totalPrice * 0.05) // 5% tax
  
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.code === 'FIRST20') {
      return Math.round(totalPrice * 0.2)
    }
    return appliedCoupon.discount
  }

  const discount = calculateDiscount()
  const grandTotal = totalPrice + deliveryFee + taxes + tip - discount

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase())
    if (coupon && totalPrice >= coupon.minOrder) {
      setAppliedCoupon(coupon)
      setCouponCode('')
    } else {
      alert('Invalid coupon code or minimum order not met')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const handleAddAddress = () => {
    const addressWithId = { ...newAddress, id: Date.now() }
    savedAddresses.push(addressWithId)
    setSelectedAddress(addressWithId.id)
    setShowAddAddress(false)
    setNewAddress({ type: 'other', street: '', city: '', state: '', zipCode: '' })
  }

  const handlePlaceOrder = () => {
    const selectedAddressData = savedAddresses.find(addr => addr.id === selectedAddress)
    
    const orderData = {
      deliveryAddress: selectedAddressData,
      paymentMethod,
      couponCode: appliedCoupon?.code,
      discount,
      deliveryFee,
      taxes,
      tip,
      deliveryInstructions,
      grandTotal
    }

    if (scheduleDelivery && scheduledTime) {
      onScheduleOrder(scheduledTime, orderData)
    } else {
      onPlaceOrder(orderData)
    }
  }

  const getMinDateTime = () => {
    const now = new Date()
    now.setHours(now.getHours() + 1) // Minimum 1 hour from now
    return now.toISOString().slice(0, 16)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Delivery Address</h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  Add New
                </button>
              </div>

              {showAddAddress && (
                <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                  <h3 className="font-medium mb-3">Add New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex space-x-3 mt-3">
                    <button
                      onClick={handleAddAddress}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {savedAddresses.length === 0 ? (
                  <p className="text-gray-500">No saved addresses. Please add a delivery address.</p>
                ) : (
                  savedAddresses.map((address) => (
                    <label key={address.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">
                            {address.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-medium">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Schedule Delivery */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Delivery Time</h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery_time"
                    checked={!scheduleDelivery}
                    onChange={() => setScheduleDelivery(false)}
                  />
                  <span className="font-medium">Deliver Now</span>
                  <span className="text-sm text-gray-500">(30-45 mins)</span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="delivery_time"
                    checked={scheduleDelivery}
                    onChange={() => setScheduleDelivery(true)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-medium">Schedule for later</span>
                    {scheduleDelivery && (
                      <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        min={getMinDateTime()}
                        className="block w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💵</span>
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💳</span>
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📱</span>
                    <span className="font-medium">UPI Payment</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Special Instructions</h2>
              <textarea
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="Any special instructions for delivery (e.g., Ring the bell, Leave at door, etc.)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.uniqueId} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">{appliedCoupon.code} Applied!</p>
                        <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Available offers:</p>
                  {availableCoupons.map((coupon) => (
                    <p key={coupon.code} className="mt-1">• {coupon.description}</p>
                  ))}
                </div>
              </div>

              {/* Tip Section */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-sm font-medium mb-3">Add Tip for Delivery Partner</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[0, 10, 20, 30].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTip(amount)}
                      className={`py-2 text-sm rounded-md border ${
                        tip === amount
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {amount === 0 ? 'No Tip' : `₹${amount}`}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={tip}
                  onChange={(e) => setTip(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Bill Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Tip</span>
                    <span>₹{tip}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress}
                className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
              >
                {scheduleDelivery ? 'Schedule Order' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout