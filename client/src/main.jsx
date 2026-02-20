import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Dashboard from "./admin/Dashboard";
import AddPoster from "./admin/AddPoster";
import ListPosters from "./admin/ListPosters";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      {/* ADMIN */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }/>

      <Route path="/admin/add" element={
        <ProtectedRoute>
          <AddPoster />
        </ProtectedRoute>
      }/>

      <Route path="/admin/list" element={
        <ProtectedRoute>
          <ListPosters />
        </ProtectedRoute>
      }/>

    </Routes>
  );
}

export default App;