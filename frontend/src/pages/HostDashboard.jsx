import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API}/properties`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setProperties(data.properties || []))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            position: "relative",
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-27b88e35eabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}>
            {/* Dark Overlay */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 0
            }}></div>

            {/* Content Container */}
            <div style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "400px",
                margin: "0 auto",
                padding: "20px",
                paddingBottom: "80px"
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    color: "white"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "24px" }}>🏠</span>
                        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>NEST</h1>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <button style={{
                            background: "transparent",
                            border: "none",
                            color: "white",
                            fontSize: "20px",
                            cursor: "pointer"
                        }}>🔔</button>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px"
                        }}>👤</div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div style={{ marginBottom: "24px", color: "white" }}>
                    <h2 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 4px 0" }}>
                        Welcome, {user?.name ? user.name.split(" ")[0] : "Alex"}
                    </h2>
                    <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                        Here's your dashboard overview for today.
                    </p>
                </div>

                {/* Analytics Card */}
                <div className="glass-card" style={{
                    padding: "20px",
                    marginBottom: "20px",
                    color: "white"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    }}>
                        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>Analytics</h3>
                        <select style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            color: "white",
                            fontSize: "12px",
                            cursor: "pointer"
                        }}>
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                            <h2 style={{ fontSize: "36px", fontWeight: "700", margin: "0 0 4px 0" }}>$4,250</h2>
                            <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>Earnings</p>
                        </div>
                        <div>
                            <h2 style={{ fontSize: "36px", fontWeight: "700", margin: "0 0 4px 0" }}>12</h2>
                            <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>Bookings</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "16px" }}>
                        <h2 style={{ fontSize: "36px", fontWeight: "700", margin: "0 0 4px 0" }}>78%</h2>
                        <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>Occupancy</p>
                    </div>
                </div>

                {/* Recent Reviews */}
                <div className="glass-card" style={{
                    padding: "20px",
                    marginBottom: "20px",
                    color: "white"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px"
                    }}>
                        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>Recent Reviews</h3>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "16px",
                            fontWeight: "600"
                        }}>
                            <span style={{ color: "#fbbf24" }}>⭐</span>
                            <span>4.92</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
                            <p style={{ margin: "0 0 4px 0", opacity: 0.95 }}>
                                "An absolutely stunning place. Will book again!"
                            </p>
                            <p style={{ margin: 0, fontSize: "12px", opacity: 0.7 }}>- Jane D.</p>
                        </div>
                        <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
                            <p style={{ margin: "0 0 4px 0", opacity: 0.95 }}>
                                "Perfect location and amazing host."
                            </p>
                            <p style={{ margin: 0, fontSize: "12px", opacity: 0.7 }}>- Mark R.</p>
                        </div>
                    </div>
                </div>

                {/* My Listings */}
                <div className="glass-card" style={{
                    padding: "20px",
                    marginBottom: "20px",
                    color: "white"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    }}>
                        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>My Listings</h3>
                        <button
                            onClick={() => navigate("/add-property")}
                            style={{
                                background: "#4285f4",
                                border: "none",
                                borderRadius: "8px",
                                padding: "6px 12px",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Add New
                        </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {properties.length === 0 ? (
                            <p style={{ margin: 0, fontSize: "14px", opacity: 0.7 }}>
                                No properties listed yet.
                            </p>
                        ) : (
                            properties.slice(0, 2).map((p, idx) => (
                                <div
                                    key={p._id}
                                    onClick={() => navigate(`/property/${p._id}`)}
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        cursor: "pointer",
                                        padding: "8px",
                                        borderRadius: "12px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                    }}
                                >
                                    <img
                                        src={(p.images && p.images[0]) || "https://source.unsplash.com/400x300/?house"}
                                        alt={p.title}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "8px",
                                            objectFit: "cover"
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{
                                            margin: "0 0 4px 0",
                                            fontSize: "15px",
                                            fontWeight: "600"
                                        }}>
                                            {p.title}
                                        </h4>
                                        <p style={{
                                            margin: "0 0 4px 0",
                                            fontSize: "13px",
                                            opacity: 0.7
                                        }}>
                                            {p.location}
                                        </p>
                                        <span className="status-badge status-published">
                                            Published
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="glass-card" style={{
                    padding: "20px",
                    color: "white"
                }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
                        Upcoming Bookings
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {[
                            { guest: "Emily White", property: "Chic Urban Apartment", dates: "Oct 28 - Nov 2" },
                            { guest: "David Chen", property: "Sunny Beachfront Villa", dates: "Nov 5 - Nov 10" }
                        ].map((booking, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px",
                                    borderRadius: "12px",
                                    background: "rgba(255, 255, 255, 0.05)"
                                }}
                            >
                                <div>
                                    <h4 style={{
                                        margin: "0 0 4px 0",
                                        fontSize: "15px",
                                        fontWeight: "600"
                                    }}>
                                        {booking.property}
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        fontSize: "13px",
                                        opacity: 0.7
                                    }}>
                                        Guest: {booking.guest}
                                    </p>
                                </div>
                                <div style={{
                                    fontSize: "13px",
                                    opacity: 0.8,
                                    textAlign: "right"
                                }}>
                                    {booking.dates}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
