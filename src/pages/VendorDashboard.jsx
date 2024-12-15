import React, { useState } from "react";
import { FaSearch, FaCog, FaBell, FaPowerOff } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const VendorDashboard = () => {
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const toggleAddDishModal = () => {
    setShowAddDishModal(!showAddDishModal);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-black text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Restaurant Name</h1>
          <p className="text-sm text-gray-400">place restaurant id here</p>
        </div>
        <nav className="flex-grow p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">All Agents</h2>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span>Zomato</span>
                <span className="text-gray-400">43 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Swiggy</span>
                <span className="text-gray-400">21 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Uber Eats</span>
                <span className="text-gray-400">10 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Food Panda</span>
                <span className="text-gray-400">6 Orders</span>
              </li>
            </ul>
          </div>
          <button className="bg-yellow-500 w-full py-2 rounded-lg mt-4 text-black font-bold flex items-center justify-center space-x-2">
            <AiOutlinePlus />
            <span>Add Agent</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Enter token or order ID to search"
              className="border border-gray-300 rounded-lg px-4 py-2 w-80"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="">Total Earnings : $0</label>
            <button className="text-gray-600" onClick={toggleNotificationModal}><FaBell /></button>
            <button className={`text-white px-4 py-2 rounded-lg ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} onClick={toggleOnlineStatus}>
              {isOnline ? 'Online' : 'Offline'}
            </button>
          </div>
        </header>

        {/* Notification Modal */}
        {showNotificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <ul className="space-y-2">
                <li className="text-sm">Order #1234 has been placed.</li>
                <li className="text-sm">Order #5678 is ready for delivery.</li>
                <li className="text-sm">New dish added to the menu.</li>
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={toggleNotificationModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order List */}
        <section className="p-4">
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              New Orders (1)
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              Preparing (3)
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              Ready for Delivery (2)
            </button>
          </div>

          {/* Order Rows */}
          <div className="bg-white shadow rounded-lg mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Token No</th>
                  <th className="p-4 text-left">Agent</th>
                  <th className="p-4 text-left">Order By</th>
                  <th className="p-4 text-left">Duration</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm text-gray-600 border-b hover:bg-gray-100 transition-colors">
                  <td className="p-4">878656</td>
                  <td className="p-4">123</td>
                  <td className="p-4">Zomato</td>
                  <td className="p-4">John Doe</td>
                  <td className="p-4">00:30:00</td>
                  <td className="p-4">$25.09</td>
                  <td className="p-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Menu Section */}
          <div className="bg-white shadow rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={toggleAddDishModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
              >
                Add Dish
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
            <img src="" alt="" className="w-full h-40 object-cover rounded-t-lg" />
              <div className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-colors">
                <h3 className="text-lg font-semibold">Dish Name</h3>
                <p className="text-sm text-gray-600">Description of the dish goes here.</p>
                <p className="text-sm font-bold mt-2">Price: $12.99</p>
              </div>
            </div>
          </div>
        </section>

        {/* Add Dish Modal */}
        {showAddDishModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Dish</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Dish Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <input
                    type="file"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={toggleAddDishModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorDashboard;
