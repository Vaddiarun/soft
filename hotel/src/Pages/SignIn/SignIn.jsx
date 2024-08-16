import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  signInFailure,
  signInstart,
  signInSuccess,
} from "../../redux/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import configuredUrl from "../../../utils/request/request";
import Cookies from "js-cookie";

export default function SignIn() {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value.trim(),
    });
  };
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.password || !formdata.email) {
      return dispatch(signInFailure("Pleasse Fill all the fields"));
    }
    try {
      dispatch(signInstart());
      const { data } = await configuredUrl.post("/user/signin", {
        formdata,
      });
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.success === true) {
        dispatch(signInSuccess(data));
        console.log("yes");
        Cookies.set("access_token", data.token, { expires: 7, path: "" });
        navigate("/admin");
      }
    } catch (e) {
      dispatch(signInFailure(e.message));
    }
  };
  const [pass, setpass] = useState();
  const handlepass = () => {
    setpass(!pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-600">
          Admin Login
        </h1>
        <div className="bg-yellow-200">
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {errorMessage}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
              value={formdata.email}
              className="p-3 rounded border border-gray-300"
            />
          </div>
          <div className="relative flex items-center justify-center">
            <input
              type={pass ? "password" : "text"}
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={formdata.password}
              className="p-3 rounded border border-gray-300 w-full pr-10" // Added padding to the right to accommodate the button
            />
            <button
              onClick={handlepass}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {pass ? (
                <FaEye className="h-5 w-5 text-gray-600" />
              ) : (
                <FaRegEyeSlash className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded font-semibold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
