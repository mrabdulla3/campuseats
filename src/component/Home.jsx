import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 p-4">
      {/* Main container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content Section */}
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Hungry? We’ve got you covered!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Order food from your favorite campus restaurants and get it
            delivered to your dorm or study spot.
          </p>
          <button className="px-6 py-3 bg-white text-purple-700 font-bold rounded hover:bg-gray-200 transition duration-300">
            Order Now
          </button>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/500x500" // Replace with actual image URL
            alt="Egg Sandwich"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
