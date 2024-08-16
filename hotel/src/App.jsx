import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingSpinner from "./Pages/Spiner/Spiner.jsx";
import UpdateStock from "./Pages/stock/UpdateStock.jsx";
import StockPage from "./Pages/stock/Stock.jsx";

const Home = lazy(() => import("./Pages/Home/Home"));
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const Foodcards = lazy(() => import("./Pages/Menu/Foodcards/Foodcards"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const OnlyAdminPrivateRoute = lazy(() =>
  import("./Components/OnlyAdminPrivateRoute/OnlyAdminPrivateRoute")
);
const Admin = lazy(() => import("./Pages/Admin/Admin.jsx"));
const SignIn = lazy(() => import("./Pages/SignIn/SignIn.jsx"));
const AdminUpdate = lazy(() => import("./Pages/Admin/AdminUpdate.jsx"));
const AdminCreate = lazy(() => import("./Pages/Admin/AdminCreate.jsx"));
const AdminOrders = lazy(() => import("./Pages/Admin/AdminOrders.jsx"));
const HandleBill = lazy(() => import("./Pages/handleBill/handleBill.jsx"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <LoadingSpinner className="mt-12" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/foodcards" element={<Foodcards />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<SignIn />} />
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/update/:title" element={<AdminUpdate />} />
            <Route path="/admin/create" element={<AdminCreate />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/printbill/:id" element={<HandleBill />} />
            <Route path="/admin/update" element={<Admin />} />
            <Route path="/admin/menu" element={<Admin />} />
            <Route path="/admin/UpdateStock" element={<UpdateStock />} />
            <Route path="/admin/stock" element={<StockPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
