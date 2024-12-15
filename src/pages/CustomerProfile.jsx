import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage({ userType }) {
  const [profileData, setProfileData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const apiEndpoint =
    userType === "user"
      ? "http://localhost:4000/users/customer-profile"
      : "http://localhost:4000/vendors/vendor-profile";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setProfileData(response.data.profile); 
        setRecentOrders(response.data.recentOrders || []); 
        setOrderDetails(response.data.orderDetails || null); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p>Loading...</p>
      </div>
    );
  }

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
              src={profileData.image || "https://via.placeholder.com/100"}
              alt={profileData.name || "User"}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">{profileData.name || "N/A"}</h2>
            <p className="text-gray-600">{profileData.email || "Email not available"}</p>
          </div>

          {/* Recent Orders */}
          {userType === "customer" && (
            <div className="mt-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 font-medium">Recent Orders</span>
              </div>
              <div className="space-y-2">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-blue-100 rounded-lg p-2"
                  >
                    <span className="text-blue-600 font-medium">{order.item}</span>
                    <span className="text-gray-700">${order.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-2xl">💳</span>
              <span className="text-gray-700 font-medium">Payment</span>
            </div>
            {userType === "customer" && (
              <div className="flex items-center space-x-3 cursor-pointer">
                <span className="text-2xl">📦</span>
                <span className="text-gray-700 font-medium">Subscription</span>
              </div>
            )}
            <div className="flex items-center space-x-3 cursor-pointer">
              <span className="text-2xl">❓</span>
              <span className="text-gray-700 font-medium">FAQs</span>
            </div>
          </div>
        </div>

        {/* Order Details Page */}
        {userType === "customer" && orderDetails && (
          <div className="bg-white shadow-lg rounded-2xl w-80 p-6">
            {/* Header */}
            <h3 className="text-gray-800 mb-4">
              Recent order at{" "}
              <span className="text-blue-500 font-semibold cursor-pointer">
                {orderDetails.restaurantName}
              </span>
            </h3>
            <img
              src={orderDetails.image || "https://via.placeholder.com/300x150"}
              alt="Order"
              className="w-full rounded-lg mb-4"
            />

            {/* Order Item */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                {orderDetails.quantity}
              </span>
              <span className="text-gray-800 font-medium">{orderDetails.item}</span>
              <span className="text-gray-700">${orderDetails.price}</span>
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${orderDetails.tax}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span>${orderDetails.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span className="text-blue-500">${orderDetails.total}</span>
              </div>
            </div>

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
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
