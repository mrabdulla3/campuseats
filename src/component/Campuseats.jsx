import React from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/5.jpg";
import img3 from "../assets/6.jpg";
import img4 from "../assets/7.jpg";

const CampusEats = () => {
  const handleCategoryClick = (categoryName) => {
    alert(`You selected: ${categoryName}`);
    // Replace alert with actual navigation or functionality.
  };

  const handleDishClick = (dishName) => {
    alert(`You clicked on: ${dishName}`);
    // Replace alert with actual functionality, such as opening a modal or navigating.
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search and Categories */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          What do you feel like having?
        </h2>
        <div className="grid grid-cols-6 gap-6">
          {[
            {
              name: "Aalo Paratha",
              img: require("../images/aalo_paratha.png"),
            },
            { name: "Coffee", img: require("../images/coffee.png") },
            { name: "Dal Rice", img: require("../images/dal_rice.png") },
            {
              name: "Palak Paneer",
              img: require("../images/palak_paneer.png"),
            },
            { name: "Milk", img: require("../images/milk.png") },
            { name: "Mix Veg", img: require("../images/mix_veg.png") },
          ].map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="relative group bg-purple-50 hover:bg-purple-100 transition transform hover:-translate-y-2 duration-300 shadow-md rounded-lg flex flex-col items-center py-6 cursor-pointer"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-40 h-40 object-cover mb-4 rounded-md transition-transform transform group-hover:scale-110 duration-300"
              />
              <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 tracking-wide">
                {category.name}
              </span>
              <div className="absolute inset-0 bg-purple-300 opacity-0 group-hover:opacity-20 rounded-lg transition duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Dishes */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              name: "Vanilla Burst Cake",
              description: "Need a good cake? Here you go!",
              rating: "4.8",
              type: "Sweet",
              time: "40-50 min",
              image: img1,
            },
            {
              name: "Chocolate Shake",
              description: "Feeling tired? Here's a chocolate shake for you!",
              rating: "4.5",
              type: "Drink",
              time: "20-30 min",
              image: img2,
            },
            {
              name: "Veg Burger",
              description: "A veg burger perfect for snack time.",
              rating: "4.6",
              type: "Snack",
              time: "25-35 min",
              image: img3,
            },
            {
              name: "Paneer Pizza",
              description: "Feel the taste with a healthy touch of paneer.",
              rating: "4.7",
              type: "Snack",
              time: "20-30 min",
              image: img4,
            },
          ].map((dish) => (
            <div
              key={dish.name}
              className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
              onClick={() => handleDishClick(dish.name)}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {dish.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-yellow-500 font-semibold">
                    ★ {dish.rating}
                  </span>
                  <span className="text-gray-500">{dish.type}</span>
                  <span className="text-gray-500">{dish.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusEats;
