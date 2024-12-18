import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-100 flex flex-col">
      {/* Track Order Section */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-auto">
        <div className="container mx-auto px-6 grid grid-cols-3 gap-6">
          {/* Column 1: About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CampusEats</h3>
            <p className="text-gray-400 text-sm">
              Connecting hungry students with local restaurants for quick and easy food delivery.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>About Us</li>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Column 3: Connect With Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-6">
          © 2023 CampusEats. All rights reserved.
        </div>

        {/* Display IP Address */}
      </footer>
    </div>
  );
};

export default Footer;
