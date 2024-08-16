import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import configuredUrl from "../../../utils/request/request";

export default function AdminOrders() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await configuredUrl.get("/orders/activeorders");
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <h1>Orders</h1>
      {orders.map((each) => (
        <div>
          <h1>Table : {each.table}</h1>
          <table className="w-full border-collapse border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-300 p-2">Item Name</th>
                <th className="border border-slate-300 p-2">Quantity</th>
                <th className="border border-slate-300 p-2">Amount</th>
                <th className="border border-slate-300 p-2">Date & Time</th>
              </tr>
            </thead>
            {each.items.map((i) => (
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2">{i.title}</td>
                  <td className="border border-slate-300 p-2">{i.quantity}</td>
                  <td className="border border-slate-300 p-2">
                    {i.quantity * i.amount}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {each.createdAt.split("T")[0] +
                      " " +
                      each.createdAt.split("T")[1].split(".")[0]}
                  </td>
                </tr>
              </tbody>
            ))}
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2">Total</td>
                {each.items
                  .map((i) => i.quantity * i.amount)
                  .reduce((acc, curr) => acc + curr, 0)}
              </tr>
            </tbody>
          </table>
          <Link to={`/admin/printbill/${each._id}`}>
            <button className="bg-green-500 rounded-md p-3 m-2">
              Take Bill Printout
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
