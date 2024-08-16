import React from "react";
import { ClipLoader, ClockLoader } from "react-spinners";

const LoaderComponent = () => {
  return (
    <div
      className="bg-white"
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "100vh",
      }}
    >
      {/* RiseLoader */}
      <ClipLoader color="#f23d52" loading={true} size={70} className="mt-" />
    </div>
  );
};

export default LoaderComponent;
