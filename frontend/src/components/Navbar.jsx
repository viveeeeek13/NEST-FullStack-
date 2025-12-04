import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 40px",
      background: "white",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Link to="/" style={{
          color: "#1a73e8",
          textDecoration: "none",
          fontWeight: "800",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          gap: "5px"
        }}>
          <span style={{ fontSize: "24px" }}>⌂</span> NEST
        </Link>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ fontWeight: "500", color: "#222" }}>Log in</Link>
            <Link to="/signup" style={{
              padding: "10px 20px",
              background: "#1a73e8",
              color: "white",
              borderRadius: "25px",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to={user?.role === "host" ? "/host-dashboard" : "/guest-dashboard"}
              style={{ fontWeight: "500", color: "#222" }}
            >
              {user?.role === "host" ? "Host Dashboard" : "My Trips"}
            </Link>
            {user?.role === "host" && (
              <Link to="/add-property" style={{ fontWeight: "500", color: "#222" }}>Add Property</Link>
            )}
            <button onClick={handleLogout} style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background: "white",
              color: "#222",
              fontWeight: "500"
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
