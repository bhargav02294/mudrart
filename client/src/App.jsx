import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Dashboard from "./admin/Dashboard";
import AddPoster from "./admin/AddPoster";
import ProtectedRoute from "./admin/ProtectedRoute";
import ListPosters from "./admin/ListPosters";

import Account from "./pages/Account";
import EditProfile from "./pages/EditProfile";
import UserProtectedRoute from "./components/UserProtectedRoute";
import UserAuth from "./pages/UserAuth";
import PosterDetails from "./pages/PosterDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      {/* USER AUTH PAGE */}
      <Route path="/auth" element={<UserAuth />} />

      {/* USER ACCOUNT */}
      <Route path="/account" element={
        <UserProtectedRoute>
          <Account />
        </UserProtectedRoute>
      } />

      
<Route path="/poster/:id" element={<PosterDetails />} />
<Route path="/cart" element={<Cart />} />

      <Route path="/account/edit" element={
        <UserProtectedRoute>
          <EditProfile />
        </UserProtectedRoute>
      } />

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }/>

      <Route path="/admin/list" element={
        <ProtectedRoute>
          <ListPosters />
        </ProtectedRoute>
      }/>

      <Route path="/admin/add" element={
        <ProtectedRoute>
          <AddPoster />
        </ProtectedRoute>
      }/>

    </Routes>
  );
}

export default App;