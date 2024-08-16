import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configuredUrl from "../../../utils/request/request";

export default function HandleBill() {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const { data } = await configuredUrl.get(
          `/orders/getSingleOrder/${id}`
        );
        setOrder(data);
        console.log(data);
        setTotal(
          data.items
            .map((each) => each.quantity * each.amount)
            .reduce((acc, curr) => acc + curr, 0)
        );
        setShow(true);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  const componentRef = useRef();
  const date = new Date();

  const generateReceipt = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "bill",
    onAfterPrint: () => toast.success("print successfull"),
  });

  const handleOrderComplete = async () => {
    try {
      const { data } = await configuredUrl.delete(
        `/orders/orderComplete/${order._id}`
      );
      console.log(data);
      if (data.success) {
        // alert("");
        toast.success("Order Has been removed successfully");
        setTimeout(() => {
          navigate("/admin/orders");
        }, 5000);
        // navigate("/admin/orders");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen text-black p-9">
      <h1>Handle Bill</h1>
      {loading && <h1>Loading</h1>}
      {show && (
        <div className="" ref={componentRef}>
          <h1>Relish Cafe</h1>
          <h1>Gandhi Road,Bellary,Karnataka</h1>
          <h1>PHONE NO:9999999999</h1>
          <h1 className="border-b-2 border-dotted border-black">
            GSTIN: 088338JBBPS89
          </h1>
          <div className="flex justify-between items-center">
            <h1>Bill No: 140</h1>
            <h1>
              Date: {date.getFullYear()}/{date.getMonth()}/{date.getDate()}
            </h1>
          </div>
          <div className="">
            <h1>Table No: {order.table}</h1>
          </div>
          <table>
            <thead>
              <tr className="border-b-2 border-t-2 border-dotted border-black">
                <td>Item Name</td>
                <td>Qty</td>
                <td>Price</td>
                <td>Value</td>
              </tr>
            </thead>
            <tbody>
              {order.items.map((each) => (
                <tr>
                  <td>{each.title}</td>
                  <td>{each.quantity}</td>
                  <td>{each.amount}</td>
                  <td>{each.quantity * each.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="border-t-2 border-dotted border-black">
            SUB TOTAL: {total}
          </h1>
          <h1 className="mt-2">
            Add S GST(9.00%) on {total} : {total * (9 / 100)}
          </h1>
          <h1 className="">
            Add C GST(9.00%) on {total} : {total * (9 / 100)}
          </h1>
          <h1 className="">
            Amount Inclusive of All Taxes: {total + total * (18 / 100)}
          </h1>
          <h1>Cashier: Ram</h1>
          <h1>Thank You For Your Visit</h1>
          <h1>Have a nice day</h1>
        </div>
      )}
      <div>
        <button
          onClick={generateReceipt}
          className="bg-green-500 text-white p-3 rounded-md mt-3"
        >
          Print Receipt
        </button>
        <button
          onClick={handleOrderComplete}
          className="ml-3 bg-red-500 text-white p-3 rounded-md mt-3"
        >
          Mark As Completed
        </button>
      </div>
      {error && <h1>{error}</h1>}
      <ToastContainer />
    </div>
  );
}
