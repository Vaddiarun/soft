import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx"; // Import the hamburger icon from react-icons

export default function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xl font-bold text-gray-800">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/019/194/935/small_2x/global-admin-icon-color-outline-vector.jpg"
              alt="  Dashboard"
              className="h-10 mr-2 inline-block"
            />
          </Link>
          <nav className="hidden md:flex gap-4  text-xl">
            <Link
              to="/admin/orders"
              className="text-gray-600 hover:text-gray-800 mr-3"
            >
              Orders
            </Link>
            <Link
              to="/admin/update"
              className="text-gray-600 hover:text-gray-800 mr-3"
            >
              Update Menu
            </Link>
            <Link
              to="/admin/create"
              className="text-gray-600 hover:text-gray-800 mr-3"
            >
              Create
            </Link>
            <Link
              to="/admin/stock"
              className="text-gray-600 hover:text-gray-800"
              onClick={toggleMobileMenu}
            >
              Stock
            </Link>
            <Link
              to="/admin/UpdateStock"
              className="text-gray-600 hover:text-gray-800"
            >
              UpdateStock
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            {isMobileMenuOpen ? (
              <RxCross2 className="h-8 w-8" />
            ) : (
              <HiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden  flex flex-col items-start gap-4 p-4 bg-white shadow-md ">
          <Link
            to="/admin/orders"
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMobileMenu}
          >
            Orders
          </Link>
          <Link
            to="/admin/update"
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMobileMenu}
          >
            Update Menu
          </Link>
          <Link
            to="/admin/create"
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMobileMenu}
          >
            Create
          </Link>
          <Link
            to="/admin/stock"
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMobileMenu}
          >
            Stock
          </Link>
          <Link
            to="/admin/UpdateStock"
            className="text-gray-600 hover:text-gray-800"
            onClick={toggleMobileMenu}
          >
            UpdateStock
          </Link>
        </nav>
      )}
    </header>
  );
}
