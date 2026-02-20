import { Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Dashboard from "./admin/Dashboard";
import AddPoster from "./admin/AddPoster";
import ProtectedRoute from "./admin/ProtectedRoute";
import ListPosters from "./admin/ListPosters";

function App() {
  return (
    <Routes>
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