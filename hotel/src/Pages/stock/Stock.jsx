import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import configuredUrl from "../../../utils/request/request";

export default function StockPage() {
  const [stock, setStock] = useState([]);
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data } = await configuredUrl.get("/stock/getStock");
        if (data.success) {
          setStock(data.Stock);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchStock();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#e9e4f0] to-[ #decce3] min-h-screen">
      <AdminHeader />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Stock Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stock.map((each) => (
            <div
              key={each._id}
              className="bg-white p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {each.name}
              </h2>
              <p className="text-gray-600">Quantity: {each.quantity}</p>
              <p className="text-gray-500 text-sm">
                Added on: {new Date(each.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
