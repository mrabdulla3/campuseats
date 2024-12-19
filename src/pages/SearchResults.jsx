import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Extract query parameter from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        setLoading(false);
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:4000/menu/search-menu/${searchQuery}`
        );

        // Assigning images from local assets cyclically
        const images = [img1, img2, img3, img4, img5];
        const dataWithImages = response.data.map((item, index) => ({
          ...item,
          imageUrl: images[index % images.length],
        }));

        setResults(dataWithImages);
      } catch (err) {
        console.log(searchQuery);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleAddToCart = async (menu_id) => {
    const order_id = Date.now();
    const quantity = 1;

    const selectedItem = results.find((item) => item.id === menu_id);
    if (!selectedItem) return;

    const price = selectedItem.price;

    const cartItem = { order_id, menu_id, quantity, price };

    try {
      const response = await fetch(
        "http://localhost:4000/order_items/add-to-cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        }
      );

      if (response.ok) {
        alert("Item added to cart successfully!");
        setCart((prevCart) => [...prevCart, cartItem]);
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Search Results
        </h1>

        {loading && (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        )}
        {error && (
          <p className="text-center text-lg text-red-600">{error}</p>
        )}
        {!loading && results.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No results found for "{searchQuery}"
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
              >
                {/* Image */}
                <img
                  src={result.imageUrl || "https://via.placeholder.com/300"}
                  alt={result.name}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {result.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    Category: {result.category}
                  </p>
                  <p className="text-md font-bold text-gray-900 mt-3">
                    Rs {result.price}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(result.id)}
                    className="w-full mt-4 bg-purple-500 text-white text-sm py-2 px-3 rounded-md hover:bg-purple-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
