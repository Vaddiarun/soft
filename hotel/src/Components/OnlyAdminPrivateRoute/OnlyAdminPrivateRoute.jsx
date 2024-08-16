import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";

import Cookies from "js-cookie";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const token = Cookies.get("access_token");
  return currentUser && currentUser.isAdmin && token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
