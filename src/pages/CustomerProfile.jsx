import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/users/profile",
          {
            headers: { Authorization: token },
          }
        );
        console.log("Fetched profile data:", response.data); 
        setProfileData(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
        setError("Failed to load profile data. Please try again.");
        setLoading(false);
      }
    };

    if (token) fetchData();
    else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!password) {
      alert("Please enter your password to confirm changes.");
      return;
    }
  
    try {
      await axios.put(
        "http://localhost:4000/users/profile-update",
        { ...formData, id: profileData.id, currentPassword: password }, 
        {
          headers: { Authorization: token },
        }
      );
      setProfileData(formData);
      setIsEditing(false);
      setPassword(""); 
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile data:", err.message);
      alert("Failed to update profile. Please check your password and try again.");
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg flex flex-col items-center py-8">
        <div className="relative">
          {/* Profile Image */}
          <img
            src={
              selectedImage ||
              profileData.image ||
              "https://via.placeholder.com/100"
            }
            alt={profileData.name || "User"}
            className="w-24 h-24 rounded-full mb-4"
          />
          {/* File Input for Image Selection */}
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-400">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {/* Camera Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 7.5l1.5-2.5h7.5l1.5 2.5m-9 0h6m-6 0v1m0-1v-1m6 1v1m0-1v-1"
              />
            </svg>
          </label>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {profileData.name || "N/A"}
        </h2>
        <p className="text-gray-500 mb-6">{profileData.email || "N/A"}</p>
        <button className="w-3/4 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg shadow-md">
          Orders
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-100 to-yellow-50 p-8">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Profile Details
            </h2>
            {isEditing ? (
              <button
                className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg shadow-md"
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
                className="w-full border rounded-md px-3 py-2 text-gray-800 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${
                  !isEditing ? "bg-gray-100" : ""
                }`}
              />
            </div>
            {isEditing && (
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                  placeholder="Enter your password"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
