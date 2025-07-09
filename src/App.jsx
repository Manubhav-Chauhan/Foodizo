import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FoodCategories from './components/FoodCategories'
import RestaurantList from './components/RestaurantList'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const updateCartItemQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <Hero />
        <FoodCategories />
        <RestaurantList 
          searchQuery={searchQuery}
          onAddToCart={addToCart}
        />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  )
}

export default App