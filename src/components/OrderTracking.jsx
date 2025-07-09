import React, { useState, useEffect } from 'react'

const OrderTracking = ({ order, onBack }) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'confirmed')
  const [estimatedTime, setEstimatedTime] = useState(45)

  const orderSteps = [
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'We have received your order',
      icon: '✅',
      time: '0 min'
    },
    {
      status: 'preparing',
      title: 'Preparing Your Food',
      description: 'The restaurant is preparing your order',
      icon: '👨‍🍳',
      time: '15 min'
    },
    {
      status: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      icon: '🚚',
      time: '30 min'
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: '🎉',
      time: '45 min'
    }
  ]

  useEffect(() => {
    // Simulate order progress
    const statusProgression = ['confirmed', 'preparing', 'out_for_delivery', 'delivered']
    const currentIndex = statusProgression.indexOf(currentStatus)
    
    if (currentIndex < statusProgression.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(statusProgression[currentIndex + 1])
        setEstimatedTime(prev => Math.max(0, prev - 15))
      }, 15000) // Change status every 15 seconds for demo
      
      return () => clearTimeout(timer)
    }
  }, [currentStatus])

  const getCurrentStepIndex = () => {
    return orderSteps.findIndex(step => step.status === currentStatus)
  }

  const isStepCompleted = (stepIndex) => {
    return stepIndex <= getCurrentStepIndex()
  }

  const isStepActive = (stepIndex) => {
    return stepIndex === getCurrentStepIndex()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order #{order?.id}</p>
              <p className="text-lg font-semibold text-green-600">₹{order?.totalAmount}</p>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tracking Your Order</h1>
            {currentStatus === 'delivered' ? (
              <p className="text-green-600 font-medium">Your order has been delivered!</p>
            ) : (
              <p className="text-gray-600">
                Estimated delivery time: <strong>{estimatedTime} minutes</strong>
              </p>
            )}
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">Order Status</h2>
          
          <div className="relative">
            {orderSteps.map((step, index) => (
              <div key={step.status} className="flex items-center mb-8 last:mb-0">
                {/* Progress Line */}
                {index < orderSteps.length - 1 && (
                  <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                    isStepCompleted(index) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
                
                {/* Step Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 ${
                  isStepCompleted(index)
                    ? 'bg-green-500 text-white'
                    : isStepActive(index)
                    ? 'bg-orange-500 text-white animate-pulse'
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {isStepCompleted(index) && !isStepActive(index) ? '✓' : step.icon}
                </div>
                
                {/* Step Content */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${
                      isStepCompleted(index) ? 'text-green-600' : 
                      isStepActive(index) ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                  
                  {isStepActive(index) && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm text-orange-600 font-medium ml-2">In Progress</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-4">
            {order?.items?.map((item) => (
              <div key={item.uniqueId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.customizations && Object.keys(item.customizations).length > 0 && (
                    <p className="text-sm text-gray-600">
                      {Object.entries(item.customizations).map(([key, value]) => 
                        `${key}: ${value}`
                      ).join(', ')}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">Qty: {item.quantity}</p>
                  <p className="text-green-600 font-semibold">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-lg font-bold text-green-600">₹{order?.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="font-medium">{order?.deliveryAddress?.street || '123 Main Street'}</p>
              <p className="text-gray-600">{order?.deliveryAddress?.city || 'New York'}, {order?.deliveryAddress?.state || 'NY'} {order?.deliveryAddress?.zipCode || '10001'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{order?.paymentMethod || 'Cash on Delivery'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Order Time</p>
              <p className="font-medium">
                {order?.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now'}
              </p>
            </div>
            
            {order?.estimatedDelivery && (
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium text-green-600">
                  {new Date(order.estimatedDelivery).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Restaurant</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Chat Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking