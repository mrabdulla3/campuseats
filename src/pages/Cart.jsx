import React from 'react';

const Cart = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-6">
      {/* Shopping Cart Section */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-6">Shopping cart</h2>

        {/* Cart Items */}
        <div className="space-y-6">
          {/* Item 1 */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Black Hoodie"
                className="w-20 h-20 object-cover"
              />
              <div>
                <p className="font-semibold">Pizza</p>
                <p className="text-gray-500">Price: &#8377;200</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 border rounded text-center"
              />
              <p className="font-semibold">&#8377;200</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Sleeveless Shirt"
                className="w-20 h-20 object-cover"
              />
              <div>
                <p className="font-semibold">Paneer Sandwich</p>
                <p className="text-gray-500">Price: &#8377;200</p>

              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 border rounded text-center"
              />
              <p className="font-semibold">&#8377;200</p>
            </div>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="flex items-center mt-6 space-x-4">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-1 border p-2 rounded"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            Apply coupon
          </button>
        </div>
      </div>

      {/* Cart Totals Section */}
      <div className="w-full md:w-1/3 mt-8 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-bold mb-6">Cart totals</h2>

        <div className="border p-6 space-y-4 rounded">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-semibold">&#8377;400</p>
          </div>

          {/* Shipping Options */}
          <div>
            <p className="font-semibold mb-2">Shipping</p>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipping" defaultChecked />
                <span>Free shipping</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipping" />
                <span>Flat rate: &#8377;10.00</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="shipping" />
                <span>Pickup: &#8377;15.00</span>
              </label>
            </div>
            <button className="text-blue-600 underline mt-2">
              Calculate shipping
            </button>
          </div>

          <div className="flex justify-between border-t pt-4">
            <p>Total</p>
            <p className="font-bold">&#8377;425.00</p>
          </div>

          <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 mt-4">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;