import React, { useState } from 'react'

const RestaurantCard = ({ restaurant, onAddToCart, onAddToFavorites, isFavorite, currentUser }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [customizations, setCustomizations] = useState({})

  const handleAddToFavorites = (e) => {
    e.stopPropagation()
    if (currentUser) {
      onAddToFavorites(restaurant, 'restaurant')
    }
  }

  const handleAddToCart = (item) => {
    const itemWithRestaurant = {
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      image: `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop`
    }
    onAddToCart(itemWithRestaurant, customizations)
    setCustomizations({})
    setSelectedItem(null)
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setCustomizations({})
  }

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
          {currentUser && (
            <button
              onClick={handleAddToFavorites}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
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
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div className="flex items-start p-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <span className="text-lg font-semibold text-green-600">₹{item.price}</span>
                          </div>
                         
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            {currentUser && (
                              <button
                                onClick={() => onAddToFavorites(item, 'item')}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                            )}
                            
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <span className="text-yellow-500">★</span>
                              <span>{(Math.random() * 2 + 3).toFixed(1)}</span>
                              <span>({Math.floor(Math.random() * 500 + 50)})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleItemClick(item)}
                              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                            >
                              Customize
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Customization Panel */}
                    {selectedItem?.id === item.id && (
                      <div className="border-t bg-gray-50 p-4">
                        <h5 className="font-medium mb-3">Customize your {item.name}</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Spice Level
                            </label>
                            <div className="flex space-x-2">
                              {['Mild', 'Medium', 'Spicy', 'Extra Spicy'].map((level) => (
                                <label key={level} className="flex items-center space-x-1">
                                  <input
                                    type="radio"
                                    name="spiceLevel"
                                    value={level}
                                    onChange={(e) => setCustomizations(prev => ({ ...prev, spiceLevel: e.target.value }))}
                                    className="text-orange-600"
                                  />
                                  <span className="text-sm">{level}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Size
                            </label>
                            <div className="flex space-x-2">
                              {['Regular', 'Large'].map((size) => (
                                <label key={size} className="flex items-center space-x-1">
                                  <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    onChange={(e) => setCustomizations(prev => ({ ...prev, size: e.target.value }))}
                                    className="text-orange-600"
                                  />
                                  <span className="text-sm">{size} {size === 'Large' ? '(+₹20)' : ''}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Special Instructions
                            </label>
                            <textarea
                              placeholder="Any special requests..."
                              value={customizations.instructions || ''}
                              onChange={(e) => setCustomizations(prev => ({ ...prev, instructions: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                              rows="2"
                            />
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            <button
                              onClick={() => setSelectedItem(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
