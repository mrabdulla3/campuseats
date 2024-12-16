import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userType, setUserType] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
    const storedUserType = localStorage.getItem("userType"); 
    setUserType(storedUserType || ""); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userType"); 
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link to="/">
        <div className="text-2xl font-bold text-purple-700">CampusEats</div>
      </Link>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for food or restaurants"
          className="flex-grow outline-none text-gray-700"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3a6 6 0 100 12 6 6 0 000-12zM2 9a7 7 0 1112.39 4.56l4.27 4.27a1 1 0 01-1.42 1.42l-4.27-4.27A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 text-gray-600">
        {/* Conditionally Render Links Based on Login Status */}
        {isLoggedIn ? (
          <>
            <Link to="/menu" className="hover:text-purple-700">
              Menu
            </Link>
            <Link to="/profile" className="hover:text-purple-700">
              Profile
            </Link>
            {/* Show Cart only if userType is NOT vendor */}
            {userType !== "vendor" && (
              <Link to="/cart" className="hover:text-purple-700">
                Cart
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
