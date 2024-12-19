import React from 'react';

const ApplicationDetails = ({ application }) => {
  if (!application) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">{application.restaurantName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-indigo-700 mb-2">Restaurant Information</h3>
          <p><strong>Cuisine:</strong> {application.cuisine}</p>
          <p><strong>Address:</strong> 123 College St, University City, ST 12345</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> contact@{application.restaurantName.toLowerCase().replace(/\s+/g, '')}.com</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-indigo-700 mb-2">Application Details</h3>
          <p><strong>Submitted on:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Status:</strong> Pending Review</p>
          <p><strong>Proposed Menu Items:</strong> 25</p>
          <p><strong>Estimated Delivery Time:</strong> 30-45 minutes</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-indigo-700 mb-2">About the Restaurant</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          Accept Application
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          Reject Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;

