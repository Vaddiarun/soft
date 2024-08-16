import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import configuredUrl from "../../../utils/request/request";

export default function AdminCreate() {
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [available, setAvailable] = useState(true);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setFailure(false);
    const { data } = await configuredUrl.post("/menu/create", {
      ...formData,
      available: available,
      category: category,
    });
    if (data.success) {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleStatusRadioSubmit = (e) => {
    setAvailable(e.target.id === "available" ? true : false);
  };

  const handleRadioSubmit = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Menu Item
        </h1>
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Availability</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="available"
                name="status"
                className="mr-2"
                onChange={handleStatusRadioSubmit}
                checked={available}
              />
              <label htmlFor="available" className="mr-4">
                Available
              </label>
              <input
                type="radio"
                id="not"
                name="status"
                className="mr-2"
                onChange={handleStatusRadioSubmit}
                checked={!available}
              />
              <label htmlFor="not">Not Available</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              onChange={handleRadioSubmit}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option>select category</option>
              <option value="momos">Momos</option>
              <option value="milkshakes">Milk Shakes</option>
              <option value="lassi">Lassi</option>
              <option value="falooda">Falooda</option>
              <option value="burgers">Burgers</option>
              <option value="fries">Fries</option>
              <option value="maggi">Maggi</option>
              <option value="icecream">Ice cream</option>
              <option value="special-icecreams">Special Icecream</option>
              <option value="muds">Muds</option>
              <option value="dry-fruit-shake">Dry Fruit Shake</option>
              <option value="coffee">Coffee</option>
              <option value="cappuccino">Cappuccino</option>
              <option value="mojito">Mojito</option>
              <option value="addons">Addons</option>
              <option value="freshjuice">Fresh Juice</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Create
          </button>
        </form>
        {success && (
          <div className="text-green-500 mt-4">Created successfully!</div>
        )}
        {failure && (
          <div className="text-red-500 mt-4">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </>
  );
}
