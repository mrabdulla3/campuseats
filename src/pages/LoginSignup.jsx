import React, { useState } from 'react';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false); // State to track if user is a restaurant

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-1/2 bg-purple-600 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome</h2>
          <p className="mb-6 text-center">
            Join Our Unique Platform, Explore a New Experience
          </p>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            {isSignup ? 'SIGN IN' : 'REGISTER'}
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-8">
          {isSignup ? (
            <>
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Sign Up</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      onChange={() => setIsRestaurant(!isRestaurant)} // Toggle restaurant checkbox
                    />
                    <span className="ml-2 text-sm text-gray-600">Are you a Restaurant?</span>
                  </label>
                </div>

                {isRestaurant && ( // Conditionally render restaurant-specific fields
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        id="restaurantName"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">
                        Opening Time
                      </label>
                      <input
                        type="time"
                        id="openingTime"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">
                        Closing Time
                      </label>
                      <input
                        type="time"
                        id="closingTime"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        id="contact"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  SIGN UP
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Sign In</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  LOGIN
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
