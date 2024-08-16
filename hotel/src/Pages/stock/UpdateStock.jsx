import React, { useState } from "react";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import configuredUrl from "../../../utils/request/request";

export default function UpdateStock() {
  const [formdata, setFormData] = useState({
    name: "",
    quantity: 0,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setSuccess(true);
    // Handle form submission logic here
    // url="http://localhost:8000/stock/addStock"
    const { data } = configuredUrl.post("/stock/addStock", {
      ...formdata,
    });

    if (data.success) {
      setSuccess(true);
      setError(false);
      setFormData({ name: "", quantity: 0 });
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-gray-100 text-gray-800 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6 text-orange-600">
            Update Stock Here
          </h1>
          <form className="flex flex-col" onSubmit={handlesubmit}>
            <label className="mb-2 text-gray-700">Enter Stock Name</label>
            <input
              type="text"
              className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              id="name"
              value={formdata.name}
              onChange={handleChange}
            />
            <label className="mb-2 text-gray-700">Enter Stock Quantity</label>
            <input
              type="number"
              className="mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              id="quantity"
              onChange={handleChange}
              value={formdata.quantity}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </form>
          {error && <p>Something went wrong please try again later.</p>}
          {success && <p>Data added successfully.</p>}
        </div>
      </div>
    </>
  );
}
