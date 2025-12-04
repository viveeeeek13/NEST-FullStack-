import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [properties, setProperties] = useState([]);
  const [view, setView] = useState("host");

  // Redirect based on role
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "host") {
        setView("host");
      } else {
        setView("guest");
      }
    }
  }, [user, loading]);

  // Fetch properties
  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await fetch(`${API}/properties/my-properties`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setProperties(data.properties || []);
      } catch (err) {
        console.log(err);
      }
    };
    if (user?.role === "host") fetchProps();
  }, [user]);

  if (loading) {
    return (
      <div className="container" style={{ marginTop: "40px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "40px", paddingBottom: "80px", maxWidth: "1200px", margin: "40px auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#222", margin: 0 }}>
          Welcome back, {user?.name?.split(" ")[0] || "User"}
        </h2>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ffd180", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          👤
        </div>
      </div>

      {/* View Switch */}
      <div style={{ background: "#f0f2f5", borderRadius: "20px", padding: "4px", display: "flex", marginBottom: "32px" }}>
        <button
          onClick={() => setView("host")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "16px",
            border: "none",
            background: view === "host" ? "white" : "transparent",
            boxShadow: view === "host" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            fontWeight: "600",
            color: view === "host" ? "#222" : "#717171",
            cursor: "pointer",
          }}
        >
          Host View
        </button>

        <button
          onClick={() => setView("guest")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "16px",
            border: "none",
            background: view === "guest" ? "white" : "transparent",
            boxShadow: view === "guest" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
            fontWeight: "600",
            color: view === "guest" ? "#222" : "#717171",
            cursor: "pointer",
          }}
        >
          Guest View
        </button>
      </div>

      {/* Host Section */}
      {view === "host" ? (
        <>
          {/* Earnings Card */}
          <div style={{
            background: "#4285f4",
            color: "white",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 8px 20px rgba(66, 133, 244, 0.3)"
          }}>
            <p style={{ margin: 0, opacity: 0.9 }}>Upcoming Earnings</p>
            <h1 style={{ fontSize: "42px", fontWeight: "700", margin: "8px 0" }}>$1,250.00</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>Based on your next 3 bookings</p>
          </div>

          {/* Properties */}
          <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700" }}>My Listings</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {properties.length === 0 ? (
              <p>No properties listed yet.</p>
            ) : (
              properties.map((p) => (
                <div key={p._id} onClick={() => navigate(`/property/${p._id}`)} style={{ cursor: "pointer" }}>
                  <img
                    src={p.images?.[0] || "https://source.unsplash.com/400x300/?house"}
                    alt=""
                    style={{ width: "100%", height: "140px", borderRadius: "16px", objectFit: "cover" }}
                  />
                  <h4 style={{ margin: "8px 0 0 0", fontWeight: "600" }}>{p.title}</h4>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#717171" }}>
          <p>Guest view is under construction 🚧</p>
        </div>
      )}

      {/* Floating Button */}
      {user?.role === "host" && (
        <button
          onClick={() => navigate("/add-property")}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#4285f4",
            color: "white",
            border: "none",
            fontSize: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          +
        </button>
      )}
    </div>
  );
}