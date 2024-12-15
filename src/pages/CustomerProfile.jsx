import React from "react";

function CustomerProfile() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-50 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-tl-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-br-full"></div>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 z-10">
        {/* Profile Page */}
        <div className="bg-white shadow-lg rounded-2xl w-80 p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">John Smith</h2>
          </div>

          {/* Recent Orders */}
          <div className="mt-6">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600 font-medium">Recent Orders</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between bg-blue-100 rounded-lg p-2">
                <span className="text-blue-600 font-medium">14" Medium Pizza</span>
                <span className="text-gray-700">$18</span>
              </div>
              <div className="flex justify-between bg-blue-100 rounded-lg p-2">
                <span className="text-blue-600 font-medium">Steamed Dumplings</span>
                <span className="text-gray-700">$12</span>
              </div>
              <div className="flex justify-between bg-blue-100 rounded-lg p-2">
                <span className="text-blue-600 font-medium">Cheeseburger and Fries</span>
                <span className="text-gray-700">$23</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-2xl">💳</span>
              <span className="text-gray-700 font-medium">Payment</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-2xl">📦</span>
              <span className="text-gray-700 font-medium">CampusEats Subscription</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-2xl">❓</span>
              <span className="text-gray-700 font-medium">FAQs</span>
            </div>
          </div>
        </div>

        {/* Order Details Page */}
        <div className="bg-white shadow-lg rounded-2xl w-80 p-6">
          {/* Header */}
          <h3 className="text-gray-800 mb-4">
            Recent order at{" "}
            <span className="text-blue-500 font-semibold cursor-pointer">
              Luigi's Pizza Fresca
            </span>
          </h3>
          <img
            src="https://via.placeholder.com/300x150"
            alt="Pizza"
            className="w-full rounded-lg mb-4"
          />

          {/* Order Item */}
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">1</span>
            <span className="text-gray-800 font-medium">14" Medium Pizza</span>
            <span className="text-gray-700">$12.00</span>
          </div>

          {/* Price Breakdown */}
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>$12.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax</span>
              <span>$1.50</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service Fee</span>
              <span>$2.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span>$2.50</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span className="text-blue-500">$18.00</span>
            </div>
          </div>

          {/* Date */}
          <p className="text-gray-500 text-sm mt-2">
            Order Date: Dec. 19th, 2019 at 8:00pm
          </p>

          {/* Buttons */}
          <div className="mt-6 space-y-2">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
              Order Again
            </button>
            <button className="w-full border-2 border-blue-500 text-blue-500 py-2 rounded-lg font-semibold">
              Contact Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
