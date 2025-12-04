import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      {/* Page Content */}
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 25px",
    background: "#f8f8f8",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
  },
  logo: {
    fontSize: "22px",
    textDecoration: "none",
    fontWeight: "bold",
    color: "#333",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
  },
  logoutBtn: {
    padding: "6px 12px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  container: {
    padding: "20px",
  },
};
