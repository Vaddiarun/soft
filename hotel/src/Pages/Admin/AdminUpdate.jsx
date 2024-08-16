import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import configuredUrl from "../../../utils/request/request";

export default function AdminUpdate() {
  const { title } = useParams();
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await configuredUrl.get(`/menu/singleItem/${title}`);
      console.log(data);
      setItem(data);
      setFormData({ amount: data.amount, title: data.title });
    };
    fetchItem();
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setFailure(false);
    const { data } = await configuredUrl.post("/menu/update", {
      ...item,
      ...formData,
      available,
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

  const handleRadioChange = (e) => {
    setAvailable(e.target.id === "available");
  };

  return (
    <>
      <AdminHeader />
      <div className="bg-white min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Update Menu Item</h1>
        <form
          className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-lg"
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
              className="w-full p-2 border border-gray-300 rounded-lg"
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
                onChange={handleRadioChange}
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
                onChange={handleRadioChange}
                checked={!available}
              />
              <label htmlFor="not">Not Available</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Update
          </button>
        </form>
        {success && (
          <div className="text-green-500 mt-4">Update successful!</div>
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
