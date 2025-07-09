import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import RestaurantList from './components/RestaurantList'
import Cart from './components/Cart'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import UserProfile from './components/UserProfile'
import OrderTracking from './components/OrderTracking'
import Checkout from './components/Checkout'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState('home') // home, profile, tracking, checkout
  const [currentOrder, setCurrentOrder] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('mbzone_user')
    const cartData = localStorage.getItem('mbzone_cart')
    const favoritesData = localStorage.getItem('mbzone_favorites')
    const orderHistoryData = localStorage.getItem('mbzone_orders')
    const addressesData = localStorage.getItem('mbzone_addresses')
    
    if (userData) setCurrentUser(JSON.parse(userData))
    if (cartData) setCartItems(JSON.parse(cartData))
    if (favoritesData) setFavorites(JSON.parse(favoritesData))
    if (orderHistoryData) setOrderHistory(JSON.parse(orderHistoryData))
    if (addressesData) setSavedAddresses(JSON.parse(addressesData))
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('mbzone_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('mbzone_favorites', JSON.stringify(favorites))
  }, [favorites])

  // Save order history to localStorage
  useEffect(() => {
    localStorage.setItem('mbzone_orders', JSON.stringify(orderHistory))
  }, [orderHistory])

  // Save addresses to localStorage
  useEffect(() => {
    localStorage.setItem('mbzone_addresses', JSON.stringify(savedAddresses))
  }, [savedAddresses])

  const addToCart = (item, customizations = {}) => {
    const itemWithCustomizations = {
      ...item,
      customizations,
      uniqueId: `${item.id}_${Date.now()}_${Math.random()}`,
      addedAt: new Date().toISOString()
    }
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
      )
      
      if (existingItemIndex !== -1) {
        return prevItems.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevItems, { ...itemWithCustomizations, quantity: 1 }]
    })
  }

  const removeFromCart = (uniqueId) => {
    setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId))
  }

  const updateCartItemQuantity = (uniqueId, quantity) => {
    if (quantity === 0) {
      removeFromCart(uniqueId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === uniqueId ? { ...item, quantity } : item
      )
    )
  }

  const addToFavorites = (item, type = 'item') => {
    const favoriteItem = {
      id: Date.now(),
      itemId: item.id,
      restaurantId: item.restaurantId || item.id,
      type,
      item,
      addedAt: new Date().toISOString()
    }
    setFavorites(prev => [...prev, favoriteItem])
  }

  const removeFromFavorites = (favoriteId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId))
  }

  const login = (userData) => {
    setCurrentUser(userData)
    localStorage.setItem('mbzone_user', JSON.stringify(userData))
    setIsAuthModalOpen(false)
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('mbzone_user')
    setCartItems([])
    setFavorites([])
    setOrderHistory([])
    setSavedAddresses([])
    setCurrentView('home')
  }

  const placeOrder = (orderData) => {
    const order = {
      id: Date.now(),
      ...orderData,
      items: cartItems,
      totalAmount: getTotalPrice(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes
      createdAt: new Date().toISOString()
    }
    
    setOrderHistory(prev => [order, ...prev])
    setCurrentOrder(order)
    setCartItems([])
    setCurrentView('tracking')
  }

  const scheduleOrder = (scheduledTime, orderData) => {
    const order = {
      id: Date.now(),
      ...orderData,
      items: cartItems,
      totalAmount: getTotalPrice(),
      status: 'scheduled',
      scheduledFor: scheduledTime,
      createdAt: new Date().toISOString()
    }
    
    setOrderHistory(prev => [order, ...prev])
    setCartItems([])
    alert('Order scheduled successfully!')
  }

  const reorderFromHistory = (order) => {
    setCartItems(order.items)
    setIsCartOpen(true)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <UserProfile
            user={currentUser}
            favorites={favorites}
            orderHistory={orderHistory}
            savedAddresses={savedAddresses}
            onBack={() => setCurrentView('home')}
            onReorder={reorderFromHistory}
            onRemoveFavorite={removeFromFavorites}
            onAddAddress={(address) => setSavedAddresses(prev => [...prev, { ...address, id: Date.now() }])}
            onEditProfile={(data) => {
              const updatedUser = { ...currentUser, ...data }
              setCurrentUser(updatedUser)
              localStorage.setItem('mbzone_user', JSON.stringify(updatedUser))
            }}
          />
        )
      case 'tracking':
        return (
          <OrderTracking
            order={currentOrder}
            onBack={() => setCurrentView('home')}
          />
        )
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            totalPrice={getTotalPrice()}
            user={currentUser}
            savedAddresses={savedAddresses}
            onBack={() => setCurrentView('home')}
            onPlaceOrder={placeOrder}
            onScheduleOrder={scheduleOrder}
          />
        )
      default:
        return (
          <main>
            <Hero />
            <RestaurantList 
              searchQuery={searchQuery}
              onAddToCart={addToCart}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
              currentUser={currentUser}
            />
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={logout}
        onProfileClick={() => setCurrentView('profile')}
      />
      
      {renderCurrentView()}

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateCartItemQuantity}
        totalPrice={getTotalPrice()}
        currentUser={currentUser}
        onCheckout={() => {
          setIsCartOpen(false)
          if (currentUser) {
            setCurrentView('checkout')
          } else {
            setIsAuthModalOpen(true)
          }
        }}
        onLoginRequired={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
      />
    </div>
  )
}

export default App