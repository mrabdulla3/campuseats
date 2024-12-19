'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiList, FiSettings, FiUser, FiBell, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { RestaurantModal } from '../component/RestaurantModal';
import ApplicationList from '../component/ApplicationList';
import ApplicationDetails from '../component/ApplicationDetails'; // Import the ApplicationDetails component

// Dummy data for restaurants
const initialRestaurants = [
  { id: 1, name: "Burger Palace", cuisine: "Fast Food", rating: 4.5, isActive: true, deliveryTime: 30, menuItems: 25 },
  { id: 2, name: "Pasta Paradise", cuisine: "Italian", rating: 4.2, isActive: true, deliveryTime: 40, menuItems: 30 },
  { id: 3, name: "Sushi Station", cuisine: "Japanese", rating: 4.7, isActive: false, deliveryTime: 35, menuItems: 40 },
  { id: 4, name: "Taco Town", cuisine: "Mexican", rating: 4.0, isActive: true, deliveryTime: 25, menuItems: 20 },
  { id: 5, name: "Veggie Delight", cuisine: "Vegetarian", rating: 4.3, isActive: true, deliveryTime: 35, menuItems: 35 },
];

const notifications = [
  { id: 1, message: "New restaurant application received", isRead: false },
  { id: 2, message: "Student feedback for Burger Palace", isRead: true },
  { id: 3, message: "Menu update from Pasta Paradise", isRead: false },
];

const initialApplications = [
  { id: 1, restaurantName: "Pizza Planet", cuisine: "Italian" },
  { id: 2, restaurantName: "Wok This Way", cuisine: "Chinese" },
  { id: 3, restaurantName: "Curry in a Hurry", cuisine: "Indian" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter(n => !n.isRead));
  const [applications, setApplications] = useState(initialApplications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null); // Added state for selected application

  useEffect(() => {
    const filtered = initialRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === 'all' || (activeFilter === 'active' && restaurant.isActive))
    );
    setRestaurants(filtered);
  }, [searchTerm, activeFilter]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

  const markNotificationAsRead = (notificationId) => {
    setUnreadNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleAcceptApplication = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    alert("Application Accepted"); // Replace with a proper toast notification in a production app
    // Here you would typically make an API call to update the application status
    console.log(`Accepted application ${appId}`);
  };

  const handleRejectApplication = (appId) => {
    setApplications(prev => prev.filter(app => app.id !== appId));
    alert("Application Rejected"); // Replace with a proper toast notification in a production app
    // Here you would typically make an API call to update the application status
    console.log(`Rejected application ${appId}`);
  };

  const handleSelectApplication = (appId) => { // Added handler for selecting application
    const selected = applications.find(app => app.id === appId);
    setSelectedApplication(selected);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-100">
          <button onClick={toggleSidebar} className="md:hidden">
            <FiX className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
        <div className="p-4">
          <ApplicationList
            applications={applications}
            onAccept={handleAcceptApplication}
            onReject={handleRejectApplication}
            onSelectApplication={handleSelectApplication} // Passed onSelectApplication
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-indigo-100">
          <button onClick={toggleSidebar} className="md:hidden">
            <FiMenu className="w-6 h-6 text-indigo-600" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-indigo-600 hover:bg-indigo-100 rounded-full"
              >
                <FiBell className="w-6 h-6" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  {unreadNotifications.length === 0 ? (
                    <p className="p-4 text-gray-500">No new notifications</p>
                  ) : (
                    unreadNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        {notification.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <FiUser className="w-6 h-6 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-700">College Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-indigo-800 mb-6">College Admin Pannel</h1>

            {selectedApplication ? (
              <ApplicationDetails application={selectedApplication} />
            ) : (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Total Restaurants</h3>
                        <FiList className="h-4 w-4 text-indigo-200" />
                      </div>
                      <p className="text-2xl font-bold">{initialRestaurants.length}</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Active Restaurants</h3>
                        <span className="px-2 py-1 text-xs bg-green-400 text-white rounded-full">
                          {initialRestaurants.filter(r => r.isActive).length}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">
                        {((initialRestaurants.filter(r => r.isActive).length / initialRestaurants.length) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-lg p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Avg. Rating</h3>
                        <FiChevronDown className="h-4 w-4 text-yellow-200" />
                      </div>
                      <p className="text-2xl font-bold">
                        {(initialRestaurants.reduce((acc, r) => acc + r.rating, 0) / initialRestaurants.length).toFixed(1)}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                    <input
                      type="text"
                      placeholder="Search restaurants..."
                      className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-md ${
                        activeFilter === 'all'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveFilter('active')}
                      className={`px-4 py-2 rounded-md ${
                        activeFilter === 'active'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      Active
                    </button>
                  </div>
                </div>

                {/* Restaurant List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {restaurants.map((restaurant) => (
                      <motion.div
                        key={restaurant.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{restaurant.name}</h3>
                            <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm font-medium text-indigo-500">Rating: {restaurant.rating}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {restaurant.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Delivery: {restaurant.deliveryTime} min</span>
                              <span>Menu Items: {restaurant.menuItems}</span>
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <button 
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300" 
                              onClick={() => handleViewDetails(restaurant)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Restaurant Details Modal */}
      <RestaurantModal
        restaurant={selectedRestaurant}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

