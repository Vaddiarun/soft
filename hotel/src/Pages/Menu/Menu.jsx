import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import LoadingSpinner from "../Spiner/Spiner";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { getMenu } from "../../redux/reducer/menuSlice";
import { addToCart } from "../../redux/reducer/menuSlice";
import { IoCartOutline } from "react-icons/io5";
import configuredUrl from "../../../utils/request/request";

export default function Menu() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [active, setActive] = useState("");
  const { menuItems, loading, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await configuredUrl.get("/categories/all-items");
        setCategories(data);
        setActive(id === "food" ? "momos" : "milkshakes");
        dispatch(getMenu());
      } catch (e) {
        setError(e.message);
      }
    };
    fetchCategories();
  }, []);

  const setReq = (cat) => () => {
    setActive(cat);
  };

  const addToCartHandler = (each) => {
    const cartItem = {
      ...each,
      quantity: 1,
      table: 2,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="bg-gray-50 w-full min-h-screen p-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex gap-3 pb-4 overflow-x-auto hide-scrollbar">
        {categories.map((each) =>
          each.type === id ? (
            <button
              onClick={setReq(each.category)}
              key={each.category}
              className={`mt-3 p-2 rounded-lg shadow-md text-center text-lg font-semibold whitespace-nowrap transition-transform duration-300 ${
                active === each.category
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {each.category.charAt(0).toUpperCase() +
                each.category.slice(1).split("-").join(" ")}
            </button>
          ) : null
        )}
      </div>
      <div className="flex justify-end">
        <div className="mt-4 flex justify-center align-center">
          {cartItems.length > 0 && (
            <button className=" p-2 rounded-md text-white mb-10 relative ">
              <Link to="/cart">
                <IoCartOutline className=" w-[40px] h-[50px] text-red-400" />

                {/* <img
                  className="w-20 bg-blue-200 "
                  src="https://static.vecteezy.com/system/resources/previews/010/778/243/non_2x/street-food-cart-for-website-symbol-icon-presentation-free-vector.jpg"
                /> */}
              </Link>
            </button>
          )}
        </div>
        {cartItems.length > 0 && (
          <p className="bg-orange-300 h-5 w-6 text-center rounded-full absolute top-28 text-black font-bold">
            {" "}
            {cartItems.length}
          </p>
        )}
      </div>
      {menuItems && menuItems.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems
            .filter((each) => each.category === active)
            .map((each, id) => (
              <div
                key={id}
                className="bg-white p-4 rounded-lg shadow-lg text-gray-800"
              >
                <h1 className="text-xl font-semibold mb-2">{each.title}</h1>
                <p className="text-lg font-medium mb-1">
                  ₹ {each.amount} rupees
                </p>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => addToCartHandler(each)}
                >
                  add to Cart
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
