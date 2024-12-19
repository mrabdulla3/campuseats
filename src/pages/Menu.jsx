import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [userType, setUserType] = useState("");
<<<<<<< HEAD
  const [cart, setCart] = useState([]);
=======
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
>>>>>>> cd3fb664cdf6314792ef424f772089a5af54e279

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

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleEdit = (itemId) => {
    openModal({
      title: "Edit Item",
      body: `Edit functionality for item with ID: ${itemId}`,
    });
  };

  const handleDelete = async (itemId) => {
<<<<<<< HEAD
    console.log(`Delete item with ID: ${itemId}`);
    try {
      await fetch(`http://localhost:4000/menu/${itemId}`, { method: "DELETE" });
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddToCart = async (menu_id) => {
    const order_id = Date.now(); 
    const quantity = 1; 

    const selectedItem = menuItems.find((item) => item.id === menu_id);
    if (!selectedItem) return;

    const price = selectedItem.price;

    const cartItem = { order_id, menu_id, quantity, price };

    try {
      const response = await fetch("http://localhost:4000/order_items/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        alert("Item added to cart successfully!");
        setCart((prevCart) => [...prevCart, cartItem]); // Update local cart
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
=======
    openModal({
      title: "Delete Item",
      body: `Are you sure you want to delete the item with ID: ${itemId}?`,
      confirmAction: async () => {
        try {
          await fetch(`http://localhost:4000/menu/${itemId}`, { method: "DELETE" });
          setMenuItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          closeModal();
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      },
    });
  };

  const handleAddToCart = (itemId) => {
    openModal({
      title: "Added to Cart",
      body: `Item with ID: ${itemId} has been added to your cart!`,
    });
>>>>>>> cd3fb664cdf6314792ef424f772089a5af54e279
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 animate-fadeIn">
          Our Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover animate-fadeIn"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {item.description}
                </p>
                <p className="text-md font-bold text-gray-900 mt-2">
                  ${item.price}
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
<<<<<<< HEAD

                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="w-full mt-4 bg-purple-500 text-white text-sm py-2 px-3 rounded-md hover:bg-purple-600"
                >
                  Add to Cart
                </button>
=======
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
>>>>>>> cd3fb664cdf6314792ef424f772089a5af54e279
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {modalContent?.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{modalContent?.body}</p>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    {modalContent?.confirmAction && (
                      <button
                        onClick={modalContent.confirmAction}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Menu;
