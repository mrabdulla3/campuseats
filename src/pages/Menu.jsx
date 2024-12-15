import React from 'react';

const Menu = () => {
  const menuItems = [
    {
      name: 'Spicy Potato',
      description: 'chili / pepper / ash',
      price: '$12.00',
      tags: ['vegetarian'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Pasta',
      description: 'cheese / ash / spaghetti / tomato paste',
      price: '$15.00',
      tags: [],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Garlic Bread',
      description: 'cheese / ash / tomato',
      price: '$12.00',
      tags: ['vegetarian'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Italian Nachos',
      description: 'cheese / ash / tomato',
      price: '$21.00',
      tags: ['new'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Tomato Soup',
      description: 'garlic / pepper / pasta / tomato',
      price: '$16.00',
      tags: ['popular', 'vegetarian'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Grilled Salmon',
      description: 'cucumber / garlic sauce / lemon / lettuce / salmon',
      price: '$20.00',
      tags: ['hot'],
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-4">{item.price}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
