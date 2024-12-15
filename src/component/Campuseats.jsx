import React from 'react';
import img1 from '../assets/1.jpg';
import img2 from '../assets/5.jpg';
import img3 from '../assets/6.jpg';
import img4 from '../assets/7.jpg';

const CampusEats = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search and Categories */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">What are you craving?</h2>
        <div className="grid grid-cols-6 gap-4">
          {['Pizza', 'Coffee', 'Salads', 'Burgers', 'Desserts', 'Sushi'].map((category) => (
            <button
              key={category}
              className="bg-purple-50 text-purple-600 py-3 px-4 rounded-md flex flex-col items-center"
            >
              <span className="text-2xl mb-2">{/* Add category icon here */}</span>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              name: 'Morning Brew Café',
              description: 'Coffee, breakfast & brunch',
              rating: '4.8',
              type: 'Café',
              time: '15-25 min',
              image: img1,
            },
            {
              name: 'Burger Joint',
              description: 'Gourmet burgers & sides',
              rating: '4.5',
              type: 'American',
              time: '20-30 min',
              image: img2,
            },
            {
              name: 'Wing Station',
              description: 'Wings & appetizers',
              rating: '4.6',
              type: 'American',
              time: '25-35 min',
              image: img3,
            },
            {
              name: 'Sweet Treats',
              description: 'Cakes, pastries & more',
              rating: '4.7',
              type: 'Desserts',
              time: '20-30 min',
              image: img4,
            },
          ].map((restaurant) => (
            <div key={restaurant.name} className="bg-white shadow-md rounded-md overflow-hidden">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{restaurant.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-yellow-500">★ {restaurant.rating}</span>
                  <span className="text-gray-500">{restaurant.type}</span>
                  <span className="text-gray-500">{restaurant.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusEats;
