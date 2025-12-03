import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      borderBottom: "1px solid #eee",
      marginBottom: 20
    }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          NEST 🏡
        </Link>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-property">Add Property</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={{
            padding: "8px 12px", borderRadius: 6, border: "none", cursor: "pointer",
            background: "#ef4444", color: "white"
          }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
