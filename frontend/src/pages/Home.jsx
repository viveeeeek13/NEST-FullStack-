import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Property Type");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch properties:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* Hero Section */}
      <div style={{
        position: "relative",
        height: "550px",
        backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-27b88e35eabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.2)"
        }}></div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "10px", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            Find Your Future<br />Home
          </h1>
          <p style={{ fontSize: "18px", fontWeight: "500", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            Book unique spaces designed for modern living.
          </p>
        </div>

        {/* Search Card */}
        <div style={{
          position: "relative",
          zIndex: 2,
          background: "white",
          padding: "24px",
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          width: "90%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>🔍</span>
            <input placeholder="e.g., San Francisco" style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>📅</span>
            <input placeholder="Add dates" type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <span style={iconStyle}>👥</span>
            <input placeholder="Add guests" type="number" style={inputStyle} />
          </div>
          <button style={{
            background: "#1a73e8",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px"
          }}>
            <span>🔍</span> Search
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px", color: "#222" }}>
          Featured Stays Near You
        </h2>

        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "30px", flexWrap: "wrap" }}>
          {["Property Type", "Amenities", "Price", "Rating"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #e0e0e0",
                background: activeFilter === filter ? "#1a73e8" : "#f7f7f7",
                color: activeFilter === filter ? "white" : "#222",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              {filter} <span>▼</span>
            </button>
          ))}
        </div>

        {/* Card Grid */}
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "30px"
          }}>
            {properties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              properties.map((item, index) => (
                <div
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/property/${item._id}`)}
                >
                  <div style={{ position: "relative", marginBottom: "12px" }}>
                    <img
                      src={(item.images && item.images[0]) || "https://source.unsplash.com/400x300/?house"}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "16px"
                      }}
                    />
                    <button style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.8)",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}>
                      ♡
                    </button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0", color: "#222" }}>{item.title}</h3>
                      <p style={{ fontSize: "14px", color: "#717171", margin: 0 }}>{item.location}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", fontWeight: "600" }}>
                      <span>★</span> {item.rating || "New"}
                    </div>
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "16px" }}>
                    <span style={{ fontWeight: "700", color: "#222" }}>₹{item.price}</span>
                    <span style={{ color: "#717171" }}> / night</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}

const inputGroupStyle = {
  background: "#f7f7f7",
  borderRadius: "12px",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const inputStyle = {
  border: "none",
  background: "transparent",
  fontSize: "16px",
  width: "100%",
  outline: "none",
  color: "#222"
};

const iconStyle = {
  fontSize: "18px",
  color: "#717171"
};
