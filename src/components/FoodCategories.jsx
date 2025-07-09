import React from 'react'

const FoodCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Pizza',
      image: '🍕',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      id: 2,
      name: 'Burger',
      image: '🍔',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
    {
      id: 3,
      name: 'Indian',
      image: '🍛',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 4,
      name: 'Chinese',
      image: '🥢',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      id: 5,
      name: 'Desserts',
      image: '🍰',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      id: 6,
      name: 'Biryani',
      image: '🍚',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 7,
      name: 'Rolls',
      image: '🌯',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      id: 8,
      name: 'South Indian',
      image: '🥥',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">What's on your mind?</h2>
        
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 ${category.bgColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <span className="text-2xl md:text-3xl">{category.image}</span>
              </div>
              <span className={`text-sm md:text-base font-medium ${category.textColor} text-center`}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoodCategories