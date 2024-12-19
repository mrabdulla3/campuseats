import React from "react";

const PaymentConfirmation = ({ orderId }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        {/* Confirmation Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Order ID */}
        <div className="bg-gray-100 p-4 rounded-md inline-block mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Order ID:#45gdvh$@hg7</span> {orderId}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => (window.location.href = "/order-history")}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
