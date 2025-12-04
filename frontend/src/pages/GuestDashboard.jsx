import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function GuestDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [savedProperties, setSavedProperties] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
        fetch(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                if (!res.ok) throw new Error("Unauthorized");
                const data = await res.json();
                setUser(data.user);
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    // Fetch some properties for saved/recommended section
    useEffect(() => {
        fetch(`${API}/properties`)
            .then((res) => res.json())
            .then((data) => setSavedProperties(data.properties?.slice(0, 4) || []))
            .catch((err) => console.log(err));
    }, []);

    const upcomingTrips = [
        { property: "Seaside Villa", location: "Malibu, CA", dates: "Dec 15-20, 2024", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400" },
        { property: "Mountain Cabin", location: "Aspen, CO", dates: "Jan 5-10, 2025", img: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=400" }
    ];

    const pastTrips = [
        { property: "Downtown Loft", location: "San Francisco", dates: "Nov 1-5, 2024", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" }
    ];

    return (
        <div className="container" style={{ marginTop: "40px", paddingBottom: "80px", maxWidth: "1200px", margin: "40px auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#222", margin: 0 }}>
                    Welcome back, {user?.name ? user.name.split(" ")[0] : "Guest"}
                </h2>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ffd180", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                    👤
                </div>
            </div>

            {/* Upcoming Trips */}
            <div style={{ marginBottom: "32px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700", color: "#222" }}>Upcoming Trips</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {upcomingTrips.map((trip, idx) => (
                        <div key={idx} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e0e0e0", cursor: "pointer" }}>
                            <img src={trip.img} alt={trip.property} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                            <div style={{ padding: "16px" }}>
                                <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#222" }}>{trip.property}</h4>
                                <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#717171" }}>{trip.location}</p>
                                <p style={{ margin: 0, fontSize: "14px", color: "#4285f4", fontWeight: "600" }}>{trip.dates}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Past Trips */}
            <div style={{ marginBottom: "32px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "700", color: "#222" }}>Past Trips</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {pastTrips.map((trip, idx) => (
                        <div key={idx} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e0e0e0", cursor: "pointer", opacity: 0.8 }}>
                            <img src={trip.img} alt={trip.property} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                            <div style={{ padding: "16px" }}>
                                <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#222" }}>{trip.property}</h4>
                                <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#717171" }}>{trip.location}</p>
                                <p style={{ margin: 0, fontSize: "14px", color: "#717171" }}>{trip.dates}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Saved Properties */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#222" }}>Saved Properties</h3>
                    <button
                        onClick={() => navigate("/")}
                        style={{ background: "none", border: "none", color: "#4285f4", fontWeight: "600", cursor: "pointer" }}
                    >
                        Browse More
                    </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                    {savedProperties.length === 0 ? (
                        <p style={{ gridColumn: "1 / -1", color: "#717171" }}>No saved properties yet.</p>
                    ) : (
                        savedProperties.map((p) => (
                            <div
                                key={p._id}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/property/${p._id}`)}
                            >
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={(p.images && p.images[0]) || "https://source.unsplash.com/400x300/?house"}
                                        alt="property"
                                        style={{ width: "100%", height: "180px", borderRadius: "16px", objectFit: "cover", marginBottom: "8px" }}
                                    />
                                    <button style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background: "rgba(255,255,255,0.9)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "32px",
                                        height: "32px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "16px"
                                    }}>
                                        ♥
                                    </button>
                                </div>
                                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#222" }}>{p.title}</h4>
                                <p style={{ margin: "2px 0", fontSize: "14px", color: "#717171" }}>{p.location}</p>
                                <p style={{ margin: "4px 0 0 0", fontSize: "15px", color: "#222" }}>
                                    <span style={{ fontWeight: "700" }}>₹{p.price}</span> / night
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Search FAB */}
            <button
                onClick={() => navigate("/")}
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
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(66, 133, 244, 0.4)",
                    cursor: "pointer",
                    zIndex: 100
                }}
            >
                🔍
            </button>
        </div>
    );
}
