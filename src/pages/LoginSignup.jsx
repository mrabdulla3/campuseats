import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
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
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const endpoint = getEndpoint(formData.userType);
        const response = await axios.post(endpoint, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        });

        setSuccess(response.data.message || "Registration successful!");
        setModalMessage("Registration successful! Please log in to continue.");
        openModal();
        localStorage.setItem("userType", formData.userType);
        localStorage.setItem("id", response.data.id);

        navigate("/login");
      } else {
        const { email, password } = formData;
        const response = await axios.post("http://localhost:4000/users/login", {
          email,
          password,
        });

        setSuccess(response.data.message || "Login successful!");
        setModalMessage("Login successful!");
        openModal();
        localStorage.setItem("token", response.data.token);
        const userType = response.data.userType;
        localStorage.setItem("userType", userType);
        localStorage.setItem("id", response.data.id);

        if (userType === "vendor") {
          navigate("/dashboard");
          window.location.reload();
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const getEndpoint = (userType) => {
    switch (userType) {
      case "vendor":
        return "http://localhost:4000/vendors/signup-vendor";
      case "deliveryboy":
        return "http://localhost:4000/users/signup-deliveryboy";
      case "college":
        return "http://localhost:4000/users/signup-college";
      default:
        return "http://localhost:4000/users/signup-customer";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-check-pattern">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden flex transform transition duration-300 hover:scale-105">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-extrabold mb-6 animate-fadeIn">
            {isSignup ? "Sign Up" : "Sign In"}
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
            {isSignup ? "SIGN IN" : "REGISTER"}
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Message</h2>
        <p className="text-gray-800">{modalMessage}</p>
        <button
          onClick={closeModal}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default LoginSignup;
