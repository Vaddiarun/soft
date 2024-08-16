import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} from "../../redux/reducer/menuSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import configuredUrl from "../../../utils/request/request.js";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 0) {
      dispatch(decreaseQuantity(item));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log(...cartItems);
      const { data } = await configuredUrl.post("/orders/addorder", {
        cartItems,
      });

      if (data.success) {
        dispatch(resetCart());
        toast.success("Order Placed Sucessfully", {
          position: "top-right",
          autoClose: 5000, // Auto close after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/foodcards");
        }, 3000);
      } else {
        const errorDetails = await res.text();
        alert(`Something went wrong! ${errorDetails}`);
      }
    } catch (error) {
      alert("Network error: Please try again later.");
    }
  };

  return (
    <div className="text-black bg-white w-screen min-h-screen flex flex-col lg:justify-start lg:items-center items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <ToastContainer />
      <div className="flex flex-col gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <section
              key={item.id}
              className="flex  flex-col gap-2 p-4 border border-gray-700 rounded-lg"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-md">Price: ₹{item.amount * item.quantity}</p>
              <div className="flex justify-between items-center">
                <button
                  aria-label="Decrease quantity"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  aria-label="Increase quantity"
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
            </section>
          ))
        ) : (
          // <p>Your cart is empty</p>
          <img src="https://mir-s3-cdn-cf.behance.net/projects/404/54b13147340145.Y3JvcCw0MDUsMzE3LDAsNDI.png" />
        )}
      </div>

      <button
        className="bg-orange-400 p-3 rounded-md disabled:opacity-50"
        onClick={handleSubmit}
        disabled={cartItems.length === 0}
      >
        Place Order
      </button>
    </div>
  );
}
