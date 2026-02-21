import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
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

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
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

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute>
            <AddPoster />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;