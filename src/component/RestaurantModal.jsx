import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RestaurantModal({ restaurant, isOpen, onClose }) {
  if (!restaurant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
            <p className="text-gray-600 mb-4">Restaurant Details</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded text-sm ${restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {restaurant.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cuisine:</span>
                <span>{restaurant.cuisine}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rating:</span>
                <span>{restaurant.rating} / 5</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery Time:</span>
                <span>{restaurant.deliveryTime} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Menu Items:</span>
                <span>{restaurant.menuItems}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

