import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../redux/reducer/menuSlice";
import { Link } from "react-router-dom";

export default function MenuItem({ category }) {
  const { loading, menuItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <div className="p-4 flex flex-wrap gap-6 justify-center items-center  lg:justify-start lg:items-start lg:m-8">
      {menuItems
        .filter((each) => each.category === category)
        .map((each) => (
          <div
            key={each._id}
            className="p-4 w-60 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h1 className="text-lg font-semibold mb-2">{each.title}</h1>
            <h2 className="text-gray-700 mb-4">₹ {each.amount}</h2>
            <Link
              to={`/admin/update/${each.title}`}
              className="block text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              Edit
            </Link>
          </div>
        ))}
    </div>
  );
}
