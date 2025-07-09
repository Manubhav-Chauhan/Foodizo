import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hungry?
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Order food from your favourite restaurants near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Order Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero