import React, { useState } from "react";
import { MdIosShare } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const toggleHead = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="bg-black w-full h-[60px] flex justify-between items-center">
        <div></div>
        <div>
          <button
            onClick={toggleHead}
            className="bg-white rounded-3xl w-10 h-10 text-center pb-2 mr-2 font-bold"
          >
            ...
          </button>
        </div>
      </div>

      {toggle && (
        <div
          className={`bg-white transform rounded-xl transition-transform duration-500 w-full h-[200px] flex flex-col items-center justify-center animate-slideUp`}
          style={{
            animation: "slideUp 0.5s ease-in-out forwards",
            position: "fixed",
            bottom: "0",
            left: "0",
          }}
        >
          <div className="flex items-start gap-10 justify-between mb-5 ">
            <h1 className="font-bold text-[20px] ">RESTRENT & KITCHEN</h1>
            <RxCross2 onClick={toggleHead} className="text-[20px]" />
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex items-center gap-20 font-bold">
              <h3>Share Restaurant</h3>
              <MdIosShare />
            </div>
            <div className="flex items-center gap-40 mt-2 font-bold">
              <h3>Report</h3>
              <LuMessagesSquare />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
