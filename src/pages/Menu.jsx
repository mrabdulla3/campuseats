import React, { useState, useEffect } from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [userType, setUserType] = useState(""); 

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);

    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/menu/");
        const data = await response.json();

        const images = [img1, img2, img3, img4, img5];
        const menuWithImages = data.map((item, index) => ({
          ...item,
          image: images[index % images.length], 
        }));

        setMenuItems(menuWithImages);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleEdit = (itemId) => {
    console.log(`Edit item with ID: ${itemId}`);
  };

  const handleDelete = async (itemId) => {
    console.log(`Delete item with ID: ${itemId}`);
    try {
      await fetch(`http://localhost:4000/menu/${itemId}`, { method: "DELETE" });
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddToCart = (itemId) => {
    console.log(`Add item with ID: ${itemId} to cart`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out overflow-hidden"
            >
              {/* Display Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2 truncate">
                  {item.description}
                </p>
                <p className="text-md font-bold text-gray-900 mt-3">
                  {item.price}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Conditional Buttons */}
                {userType === "vendor" ? (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-blue-500 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white text-sm py-2 px-3 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="w-full mt-4 bg-purple-500 text-white text-sm py-2 px-3 rounded-md hover:bg-purple-600"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
