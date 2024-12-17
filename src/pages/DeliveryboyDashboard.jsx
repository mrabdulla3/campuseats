import React, { useState, useEffect } from "react";

const DeliveryboyDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "000134",
      restaurantName: "Pizza Hut",
      restaurantAddress: "123 Main Street, City Center",
      customerName: "John Doe",
      customerAddress: "456 Elm Street, Downtown",
      orderDateTime: "2024-06-17T12:55:00",
      total: "30.80",
      status: "Pending",
      otp: "1234",
    },
    {
      id: 2,
      orderId: "000133",
      restaurantName: "Burger King",
      restaurantAddress: "789 Oak Street, Food Court",
      customerName: "Jane Smith",
      customerAddress: "101 Pine Street, Suburb",
      orderDateTime: "2024-06-17T13:30:00",
      total: "221.60",
      status: "Pending",
      otp: "5678",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const [openToWork, setOpenToWork] = useState(
    JSON.parse(localStorage.getItem("openToWork")) ?? true
  );

  // Persist Open to Work status
  useEffect(() => {
    localStorage.setItem("openToWork", JSON.stringify(openToWork));
  }, [openToWork]);

  // Open OTP Dialog
  const openOtpDialog = (order, action) => {
    setSelectedOrder(order);
    setShowOtpDialog(true);
    setActionType(action);
    setOtpInput("");
  };

  // Close OTP Dialog
  const closeOtpDialog = () => {
    setShowOtpDialog(false);
    setSelectedOrder(null);
    setActionType("");
  };

  // Handle OTP Verification
  const handleOtpVerification = () => {
    if (selectedOrder) {
      if (otpInput === selectedOrder.otp) {
        const newStatus = actionType === "accept" ? "Accepted" : "Cancelled";
        updateOrderStatus(selectedOrder.id, newStatus);
      } else {
        alert("Invalid OTP. Please try again.");
      }
      closeOtpDialog();
    }
  };

  // Update Order Status
  const updateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Format Date and Time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  // Filter Orders
  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Summary Metrics
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
  const penaltyAmount = orders.filter((order) => order.status === "Cancelled").length * 5;
  const acceptedOrders = orders.filter((order) => order.status === "Accepted").length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled").length;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-purple-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <p className="text-lg mb-2"><strong>Rahul Sharma</strong></p>
        <p className="text-sm text-gray-300 mb-4">Contact: +91 98765XXXXX</p>
        <div className="flex items-center">
          <span className="mr-3">Open to Work</span>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              checked={openToWork}
              onChange={() => setOpenToWork(!openToWork)}
              className="hidden"
            />
            <span className={`block w-full h-full rounded-full ${openToWork ? "bg-green-500" : "bg-gray-400"} transition-all duration-300`}></span>
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${openToWork ? "translate-x-6" : ""}`}
            ></span>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Orders", value: totalOrders },
            { label: "Total Amount", value: `₹${totalAmount.toFixed(2)}` },
            { label: "Penalty Amount", value: `₹${penaltyAmount}` },
            { label: "Accepted Orders", value: acceptedOrders },
            { label: "Pending Orders", value: pendingOrders },
            { label: "Cancelled Orders", value: cancelledOrders },
          ].map((card, index) => (
            <div key={index} className="bg-white p-4 shadow rounded text-center">
              <h3 className="text-gray-600">{card.label}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-600 text-white">
              <tr>
                {["Order ID", "Restaurant", "Customer", "Order Date", "Amount", "Status", "Actions"].map((head) => (
                  <th key={head} className="py-3 px-4 text-left">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 border-b transition-all duration-300">
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">{order.restaurantName}</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">{formatDateTime(order.orderDateTime)}</td>
                  <td className="py-3 px-4">₹{order.total}</td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4">
                    <button
                      className="mr-3 text-green-600 text-xl hover:scale-110 transition-all"
                      onClick={() => openOtpDialog(order, "accept")}
                    >
                      ✅
                    </button>
                    <button
                      className="text-red-600 text-xl hover:scale-110 transition-all"
                      onClick={() => openOtpDialog(order, "cancel")}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OTP Dialog */}
        {showOtpDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl mb-4">Enter OTP</h3>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="border p-2 w-full mb-4"
                placeholder="Enter OTP"
              />
              <button
                onClick={handleOtpVerification}
                className="bg-purple-600 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button onClick={closeOtpDialog} className="text-gray-600">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryboyDashboard;
