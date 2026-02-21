import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Dashboard from "./admin/Dashboard";
import AddPoster from "./admin/AddPoster";
import ProtectedRoute from "./admin/ProtectedRoute";
import ListPosters from "./admin/ListPosters";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";


function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTE */}
      <Route path="/" element={<Home />} />

      {/* ADMIN ROUTES */}
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
      
<Route path="/signup" element={<UserSignup />} />
<Route path="/login" element={<UserLogin />} />

      <Route path="/admin/add" element={
        <ProtectedRoute>
          <AddPoster />
        </ProtectedRoute>
      }/>

    </Routes>
  );
}

export default App;