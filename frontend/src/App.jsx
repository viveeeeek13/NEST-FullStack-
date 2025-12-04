import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/host-dashboard"
          element={
            <PrivateRoute>
              <HostDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/guest-dashboard"
          element={
            <PrivateRoute>
              <GuestDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
