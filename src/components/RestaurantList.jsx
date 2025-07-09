import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'

const RestaurantList = ({ searchQuery, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const restaurants = [
    {
      id: 1,
      name: "McDonald's",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
      cuisine: "American, Burgers",
      rating: 4.2,
      deliveryTime: "25-30 mins",
      deliveryFee: 29,
      offer: "50% OFF UPTO ₹100",
      category: "burger",
      items: [
        { id: 101, name: "Big Mac", price: 199, description: "Double layer burger with special sauce" },
        { id: 102, name: "McChicken Burger", price: 149, description: "Crispy chicken fillet burger" },
        { id: 103, name: "French Fries", price: 99, description: "Golden crispy potato fries" },
        { id: 104, name: "McFlurry", price: 89, description: "Ice cream with chocolate chips" }
      ]
    },
    {
      id: 2,
      name: "Domino's Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      cuisine: "Pizzas, Italian",
      rating: 4.3,
      deliveryTime: "20-25 mins",
      deliveryFee: 39,
      offer: "BUY 1 GET 1 FREE",
      category: "pizza",
      items: [
        { id: 201, name: "Margherita Pizza", price: 299, description: "Classic cheese and tomato pizza" },
        { id: 202, name: "Pepperoni Pizza", price: 399, description: "Pepperoni with cheese and herbs" },
        { id: 203, name: "Chicken Dominator", price: 549, description: "Loaded chicken pizza" },
        { id: 204, name: "Garlic Bread", price: 149, description: "Herbed garlic bread sticks" }
      ]
    },
    {
      id: 3,
      name: "Paradise Biryani",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d321?w=400&h=300&fit=crop",
      cuisine: "Biryani, Indian",
      rating: 4.5,
      deliveryTime: "35-40 mins",
      deliveryFee: 49,
      offer: "20% OFF",
      category: "biryani",
      items: [
        { id: 301, name: "Chicken Biryani", price: 299, description: "Aromatic basmati rice with chicken" },
        { id: 302, name: "Mutton Biryani", price: 399, description: "Tender mutton with fragrant rice" },
        { id: 303, name: "Veg Biryani", price: 249, description: "Mixed vegetable biryani" },
        { id: 304, name: "Raita", price: 49, description: "Cool yogurt with cucumber" }
      ]
    },
    {
      id: 4,
      name: "Wow! Momo",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop",
      cuisine: "Momos, Chinese",
      rating: 4.1,
      deliveryTime: "30-35 mins",
      deliveryFee: 35,
      offer: "₹125 OFF ABOVE ₹249",
      category: "chinese",
      items: [
        { id: 401, name: "Chicken Momos", price: 149, description: "Steamed chicken dumplings" },
        { id: 402, name: "Veg Momos", price: 129, description: "Mixed vegetable momos" },
        { id: 403, name: "Chicken Fried Rice", price: 199, description: "Wok-tossed rice with chicken" },
        { id: 404, name: "Schezwan Noodles", price: 179, description: "Spicy noodles with vegetables" }
      ]
    },
    {
      id: 5,
      name: "KFC",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&h=300&fit=crop",
      cuisine: "American, Fried Chicken",
      rating: 4.0,
      deliveryTime: "25-30 mins",
      deliveryFee: 39,
      offer: "FLAT ₹100 OFF",
      category: "chicken",
      items: [
        { id: 501, name: "Hot & Crispy Chicken", price: 199, description: "Spicy fried chicken pieces" },
        { id: 502, name: "Zinger Burger", price: 219, description: "Spicy chicken burger" },
        { id: 503, name: "Popcorn Chicken", price: 149, description: "Bite-sized crispy chicken" },
        { id: 504, name: "Coleslaw", price: 89, description: "Fresh cabbage salad" }
      ]
    },
    {
      id: 6,
      name: "The Belgian Waffle Co.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      cuisine: "Waffle, Desserts",
      rating: 4.4,
      deliveryTime: "20-25 mins",
      deliveryFee: 29,
      offer: "BUY 2 GET 1 FREE",
      category: "desserts",
      items: [
        { id: 601, name: "Chocolate Waffle", price: 249, description: "Belgian waffle with chocolate" },
        { id: 602, name: "Classic Waffle", price: 199, description: "Traditional Belgian waffle" },
        { id: 603, name: "Ice Cream Scoop", price: 99, description: "Vanilla ice cream" },
        { id: 604, name: "Nutella Waffle", price: 299, description: "Waffle with Nutella spread" }
      ]
    }
  ]

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burgers' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'chicken', name: 'Chicken' },
    { id: 'desserts', name: 'Desserts' }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Restaurants near you ({filteredRestaurants.length})
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Restaurant Cards */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RestaurantList