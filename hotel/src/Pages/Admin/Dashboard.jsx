import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import CanvasJSReact from "@canvasjs/react-charts";
import configuredUrl from "../../../utils/request/request";

export default function Dashboard() {
  const [dashData, setDashData] = useState([]);
  const [options, setOptions] = useState([]);
  var canvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  useEffect(() => {
    const fetchDashData = async () => {
      try {
        const { data } = await configuredUrl.get("/dashboard/getAllData");
        setDashData(data);
        let options = {
          animationEnabled: true,
          exportEnabled: true,
          theme: "light2", // "light1", "dark1", "dark2"
          title: {
            text: "Orders of categories",
          },
          data: [
            {
              type: "pie",
              indexLabel: "{label}: {y}%",
              startAngle: -90,
              dataPoints: Object.keys(data.charts).map((key) => ({
                y: (data.charts[key] / data.totalOrdersWithQunatity) * 100,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              })),
            },
          ],
        };
        setOptions(options);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchDashData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {dashData && (
          <>
            <section className="flex gap-6 flex-wrap mb-8">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg w-60 h-36 transform transition-transform hover:scale-105">
                <div>
                  <h2 className="text-white text-lg">Total Menu Items</h2>
                </div>
                <h3 className="text-white text-2xl mt-3">
                  {dashData.totalItems}
                </h3>
              </div>
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-6 rounded-lg shadow-lg w-60 h-36 transform transition-transform hover:scale-105">
                <div>
                  <h2 className="text-white text-lg">Total Categories</h2>
                </div>
                <h3 className="text-white text-2xl mt-3">16</h3>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg w-60 h-36 transform transition-transform hover:scale-105">
                <div>
                  <h2 className="text-white text-lg">Last Month Orders</h2>
                </div>
                <h3 className="text-white text-2xl mt-3">
                  {dashData.lasttMonthPosts}
                </h3>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg w-60 h-36 transform transition-transform hover:scale-105">
                <div>
                  <h2 className="text-white text-lg">Last Week Orders</h2>
                </div>
                <h3 className="text-white text-2xl mt-3">
                  {dashData.lastWeekPosts}
                </h3>
              </div>
            </section>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CanvasJSChart options={options} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
