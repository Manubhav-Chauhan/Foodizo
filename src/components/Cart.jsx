import React from 'react'

const Cart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity, 
  totalPrice, 
  currentUser, 
  onCheckout, 
  onLoginRequired 
}) => {
  if (!isOpen) return null

  const deliveryFee = totalPrice > 200 ? 0 : 40
  const taxes = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + taxes

  const handleCheckout = () => {
    if (!currentUser) {
      onLoginRequired()
    } else {
      onCheckout()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cart ({items.length} items)</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some delicious food to get started!</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.uniqueId} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-green-600 font-semibold">₹{item.price}</p>
                    
                    {/* Customizations */}
                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <div className="mt-1">
                        {Object.entries(item.customizations).map(([key, value]) => (
                          <p key={key} className="text-xs text-gray-600">
                            {key}: {value}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.uniqueId, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.uniqueId, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-green-600">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.uniqueId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            {/* Delivery Info */}
            {totalPrice < 200 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 font-medium">
                  Add items worth ₹{200 - totalPrice} more for free delivery! 🚚
                </p>
              </div>
            )}

            {/* Bill Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className={totalPrice > 200 ? 'text-green-600' : ''}>
                  {totalPrice > 200 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹{taxes}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
            
            {/* Login Notice */}
            {!currentUser && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  Please sign in to proceed with your order
                </p>
              </div>
            )}
            
            {/* Checkout Button */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {currentUser ? 'Proceed to Checkout' : 'Sign In to Order'}
            </button>
            
            {/* Restaurant Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                🕒 Estimated delivery: 30-45 mins
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart