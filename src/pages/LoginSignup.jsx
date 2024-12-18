import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "user", 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (isSignup) {
        const endpoint =
          formData.userType === "vendor"
            ? "http://localhost:4000/vendors/signup-vendor"
            : "http://localhost:4000/users/signup-customer";
  
        // Make the API call
        const response = await axios.post(endpoint, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        });
  
        setSuccess(response.data.message || "Registration successful!");
        localStorage.setItem("userType", formData.userType);
        localStorage.setItem("id", response.data.id);//change by Tushar
  
        if (formData.userType === "vendor") {
          navigate("/dashboard");  
        } else {
          navigate("/"); 
        }
      } else {
        const { email, password } = formData;
        const response = await axios.post("http://localhost:4000/users/login", {
          email,
          password,
        });
  
        setSuccess(response.data.message || "Login successful!");
        localStorage.setItem("token", response.data.token);
  
        const userType = response.data.userType; 
        localStorage.setItem("userType", userType);
        localStorage.setItem("id", response.data.id);//change by Tushar
        if (userType === "vendor") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };  
  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-1/2 bg-purple-600 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome</h2>
          <p className="mb-6 text-center">
            Join Our Unique Platform, Explore a New Experience
          </p>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            {isSignup ? "SIGN IN" : "REGISTER"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-8">
          {isSignup ? (
            <>
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Sign Up</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                    User Type
                  </label>
                  <select
                    id="userType"
                    value={formData.userType}
                    onChange={handleUserTypeChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="user">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  SIGN UP
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-purple-600 mb-6">Sign In</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  SIGN IN
                </button>
              </form>
            </>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
