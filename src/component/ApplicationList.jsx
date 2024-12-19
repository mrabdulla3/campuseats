import React from 'react';
import { motion } from 'framer-motion';

const ApplicationList = ({ applications, onAccept, onReject, onSelectApplication }) => {
  return (
    <div className="mb-6">
      <h3 className="mb-4 text-lg font-semibold text-indigo-800">New Applications</h3>
      <div className="h-[calc(100vh-300px)] overflow-y-auto w-full rounded-md border border-indigo-200 p-4 bg-white">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">No new applications</p>
        ) : (
          applications.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-3 bg-indigo-50 rounded-lg shadow cursor-pointer"
              onClick={() => onSelectApplication(app.id)}
            >
              <h4 className="font-medium text-indigo-700">{app.restaurantName}</h4>
              <p className="text-sm text-indigo-600 mb-2">{app.cuisine}</p>
              <div className="flex justify-between">
                <button
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  onClick={() => onAccept(app.id)}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={() => onReject(app.id)}
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationList;

