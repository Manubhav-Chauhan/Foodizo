import React, { useState } from 'react'

const RestaurantCard = ({ restaurant, onAddToCart }) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowMenu(true)}
      >
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
          />
          {restaurant.offer && (
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
              {restaurant.offer}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span className="text-green-600 font-semibold">★ {restaurant.rating}</span>
              <span>•</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
            <span>₹{restaurant.deliveryFee} delivery fee</span>
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <span className="text-green-600 font-semibold">★ {restaurant.rating}</span>
                  <span>•</span>
                  <span>{restaurant.deliveryTime}</span>
                  <span>•</span>
                  <span>₹{restaurant.deliveryFee} delivery</span>
                </div>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              <div className="space-y-4">
                {restaurant.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <span className="text-lg font-semibold text-green-600">₹{item.price}</span>
                    </div>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="ml-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RestaurantCard