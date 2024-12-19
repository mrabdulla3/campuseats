import React, { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const RestaurantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [vendor_id, setVendorId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [availability, setAvailability] = useState("");
  const [menu, setMenu] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setVendorId(decodedToken.id);
    }
  }, []);

  const fetchOurMenu = async () => {
    if (!vendor_id) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/menu/${vendor_id}`
      );
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchOurMenu();
  }, [vendor_id]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/orders/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleAddDishModal = () => {
    setShowAddDishModal(!showAddDishModal);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const toggleNotificationModal = () => {
    setShowNotificationModal(!showNotificationModal);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category) {
      console.error("Please fill all the fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:4000/menu/post-menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendor_id,
          name,
          description,
          price,
          category,
          image_url,
          availability,
        }),
      });

      if (response.ok) {
        alert("Dish Added successfully");
        toggleAddDishModal();
        setVendorId("");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setAvailability("");
        setImageUrl("");
      } else {
        console.error("Error submitting menu:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/menu/update-menu/${editItem.id}`, {
        name: editItem.name,
        description: editItem.description,
        price: editItem.price,
        category: editItem.category,
        image_url: editItem.image_url,
        availability: editItem.availability,
      });
      alert("Menu item updated successfully!");
      setIsEditing(false);
      fetchOurMenu();
    } catch (error) {
      console.log(editItem);
      console.error("Error updating menu item:", error);
      alert("Failed to update menu item.");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/menu/delete-menu/${itemId}`);
      fetchOurMenu();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.log("No token found!");
        return;
      }
  
      try {
        const response = await axios.get(
          "http://localhost:4000/users/profile",
          {
            headers: {
              Authorization:token,
            },
          }
        );
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
      }
    };
  
    if (token) fetchData();
  }, [token]);
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-black-100 text-black flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">{profileData.name || 'N/A'}</h1>
          <p className="text-sm text-gray-400">{profileData.address}</p>
          <p className="text-sm text-gray-400">Restaurant Id: {profileData.id}</p>
        </div>
        <nav className="flex-grow p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">All Agents</h2>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span>Zomato</span>
                <span className="text-gray-400">43 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Swiggy</span>
                <span className="text-gray-400">21 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Uber Eats</span>
                <span className="text-gray-400">10 Orders</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span>Food Panda</span>
                <span className="text-gray-400">6 Orders</span>
              </li>
            </ul>
          </div>
          <button className="bg-yellow-500 w-full py-2 rounded-lg mt-4 text-black font-bold flex items-center justify-center space-x-2">
            <AiOutlinePlus />
            <span>Add Agent</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Enter token or order ID to search"
              className="border border-gray-300 rounded-lg px-4 py-2 w-80"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="">Total Earnings : Rs 0</label>
            <button className="text-gray-600" onClick={toggleNotificationModal}>
              <FaBell />
            </button>
            <button
              className={`text-white px-4 py-2 rounded-lg ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={toggleOnlineStatus}
            >
              {isOnline ? "Online" : "Offline"}
            </button>
          </div>
        </header>

        {/* Notification Modal */}
        {showNotificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <ul className="space-y-2">
                <li className="text-sm">Order #1234 has been placed.</li>
                <li className="text-sm">Order #5678 is ready for delivery.</li>
                <li className="text-sm">New dish added to the menu.</li>
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={toggleNotificationModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order List */}
        <section className="p-4">
          <div className="flex space-x-4 mb-4">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              New Orders (1)
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              Preparing (3)
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
              Ready for Delivery (2)
            </button>
          </div>

          {/* Order Rows */}
          <div className="bg-white shadow rounded-lg mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">User Id</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Delivery Address</th>
                  <th className="p-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="text-sm text-gray-600 border-b hover:bg-gray-100 transition-colors"
                    >
                      <td className="p-4">{order.id}</td>
                      <td className="p-4">{order.user_id}</td>
                      <td className="p-4">{order.total_price}</td>
                      <td className="p-4">{order.status}</td>
                      <td className="p-4">{order.delivery_address}</td>
                      <td className="p-4">${order.payment_status}</td>
                      <td className="p-4">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-600">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        {/* Menu Section */}
        <div className="bg-white shadow rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Our Menu</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={toggleAddDishModal}
            >
              Add Dish
            </button>
          </div>

          {/* Add Dish Modal */}
          {showAddDishModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Dish</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Dish Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Price</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">
                      Availability
                    </label>
                    <input
                      type="text"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Image</label>
                    <input
                      type="file"
                      onChange={(e) => setImageUrl(e.target.files)}
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={toggleAddDishModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                        isSubmitting ? "opacity-50" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/*Our Menu*/}
          <div className="p-4">
            {/* Menu List */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Our Menu</h2>
              <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                    <th className="p-3 border border-gray-300">Image</th>
                    <th className="p-3 border border-gray-300">Dish Name</th>
                    <th className="p-3 border border-gray-300">Description</th>
                    <th className="p-3 border border-gray-300">Price</th>
                    <th className="p-3 border border-gray-300">Category</th>
                    <th className="p-3 border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 border border-gray-300">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.description}
                      </td>
                      <td className="p-3 border border-gray-300">
                        Rs {item.price}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {item.category}
                      </td>
                      <td className="p-3 border border-gray-300">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 mr-2"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Dish Name
                      </label>
                      <input
                        type="text"
                        value={editItem.name}
                        onChange={(e) =>
                          setEditItem({ ...editItem, name: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        value={editItem.description}
                        onChange={(e) =>
                          setEditItem({
                            ...editItem,
                            description: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Price</label>
                      <input
                        type="text"
                        value={editItem.price}
                        onChange={(e) =>
                          setEditItem({ ...editItem, price: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editItem.category}
                        onChange={(e) =>
                          setEditItem({ ...editItem, category: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editItem.image_url}
                        onChange={(e) =>
                          setEditItem({
                            ...editItem,
                            image_url: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;
