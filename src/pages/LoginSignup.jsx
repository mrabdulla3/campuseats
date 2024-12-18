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

    // Form validation
    if (isSignup && (!formData.name || !formData.email || !formData.password)) {
      setError("All fields are required.");
      return;
    }
    if (!isSignup && (!formData.email || !formData.password)) {
      setError("All fields are required.");
      return;
    }

    try {
      if (isSignup) {
        const endpoint =
          formData.userType === "vendor"
            ? "http://localhost:4000/vendors/signup-vendor"
            : formData.userType === "deliveryboy"
            ? "http://localhost:4000/users/signup-deliveryboy"
            : formData.userType === "college"
            ? "http://localhost:4000/users/signup-college"
            : "http://localhost:4000/users/signup-customer";

        const response = await axios.post(endpoint, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        });

        setSuccess(response.data.message || "Registration successful!");
        localStorage.setItem("userType", formData.userType);

        if (formData.userType === "vendor" || formData.userType === "deliveryboy") {
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

        if (userType === "vendor" || userType === "deliveryboy") {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-check-pattern">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden flex transform transition duration-300 hover:scale-105">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold mb-6 animate-fadeIn">
            {isSignup ? "Register" : "Login"}
          </h2>
          <p className="text-lg mb-8 text-center px-6 animate-fadeIn">
            {isSignup
              ? "Create your account and explore our platform."
              : "Log in to continue your journey with us."}
          </p>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="bg-white text-purple-600 px-8 py-2 rounded-full font-bold hover:bg-gray-200 shadow-md animate-bounce"
          >
            {isSignup ? "LOGIN" : "REGISTER"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-full border-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              />
            </div>
            {isSignup && (
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                  User Type
                </label>
                <select
                  id="userType"
                  value={formData.userType}
                  onChange={handleUserTypeChange}
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  required
                >
                  <option value="user">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="deliveryboy">Deliveryboy</option>
                  <option value="college">College</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-full hover:bg-indigo-700 font-bold shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
            >
              {isSignup ? "REGISTER" : "SIGN IN"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
