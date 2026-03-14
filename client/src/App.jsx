import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PosterDetails from "./pages/PosterDetails";
import Cart from "./pages/Cart";
import UserAuth from "./pages/UserAuth";
import Account from "./pages/Account";
import EditProfile from "./pages/EditProfile";
import UserProtectedRoute from "./components/UserProtectedRoute";

import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Dashboard from "./admin/Dashboard";
import AddPoster from "./admin/AddPoster";
import ListPosters from "./admin/ListPosters";
import ProtectedRoute from "./admin/ProtectedRoute";
import SelectProductType from "./admin/SelectProductType";

import AddressSelector from "./pages/AddressSelector";
import DigitalCheckout from "./pages/DigitalCheckout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/poster/:id" element={<PosterDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<UserAuth />} />

        <Route
          path="/account"
          element={
            <UserProtectedRoute>
              <Account />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/account/edit"
          element={
            <UserProtectedRoute>
              <EditProfile />
            </UserProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route path="/digital/:id" element={<DigitalCheckout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/select"
          element={
            <ProtectedRoute>
              <SelectProductType />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add"
          element={
            <ProtectedRoute>
              <AddPoster />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/list"
          element={
            <ProtectedRoute>
              <ListPosters />
            </ProtectedRoute>
          }
        />

        <Route path="/checkout/address" element={<AddressSelector />} />

      </Routes>
    </>
  );
}

export default App;