import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineMenu } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import SignIn from "../SignIn/SignIn";

export default function Home() {
  const handleSignIn = async () => {
    const res = await fetch("http://localhost:8000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin",
        password: "admin@123",
      }),
    });
  };
  return (
    <>
      <div className="bg-black ">
        <div className="relative  p-4">
          <button>
            <Link to="/admin">
              {" "}
              {/* <GrUserAdmin /> */}
              <img
                className="w-[50px] h-[50px] "
                src="https://static.vecteezy.com/system/resources/thumbnails/019/194/935/small_2x/global-admin-icon-color-outline-vector.jpg"
              />
            </Link>
          </button>
        </div>

        <div className="flex  flex-col items-center justify-center min-h-screen bg-transperent text-white text-center p-4">
          <img
            src="https://marketplace.canva.com/EAF1XAgJrCg/1/0/1600w/canva-white-brown-simple-restaurant-logo-koIA1HEug0Q.jpg" // Add the path to your logo image
            alt="Restaurant Logo"
            className="w-32 h-auto mb-4 rounded-[200px]"
          />
          <h1
            className="text-4xl font-bold mb-2 opacity-0 translate-y-10 transition-transform transition-opacity duration-1000"
            style={{
              animation: "fadeInTransform 1s forwards",
              animationDelay: "2s",
            }}
          >
            Welcome to Our <span className="text-yellow-300"> Restaurant</span>
          </h1>
          <p
            className="text-lg mb-4 opacity-0 translate-y-10 transition-transform transition-opacity duration-1000"
            style={{
              animation: "fadeInTransform 1s forwards",
              animationDelay: "2.5s",
            }}
          >
            Experience the finest dining in the city.
          </p>
          <h2
            className="text-2xl font-semibold mb-4 opacity-0 translate-y-10 transition-transform transition-opacity duration-1000"
            style={{
              animation: "fadeInTransform 1s forwards",
              animationDelay: "3s",
            }}
          >
            Namaste 🙏
          </h2>
          <div className="">
            <Link to="/foodcards">
              {" "}
              <div className="  flex justify-between items-center gap-y-2 mb-3 p-5 hover:scale-x-95 bg-[#1e2229] w-[300px] h-[50px] rounded-2xl">
                <MdOutlineMenu /> <button>Menu </button>
                <p>
                  <HiOutlineDotsVertical />
                </p>
              </div>
            </Link>
          </div>

          {/* Inline styles for keyframes */}
          <style>
            {`
          @keyframes fadeInTransform {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
          </style>
        </div>
      </div>
    </>
  );
}
