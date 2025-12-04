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
        <div className="container" style={{ marginTop: "40px", paddingBottom: "80px", maxWidth: "1200px", margin: "40px auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#222", margin: 0 }}>
                    Welcome back, {user?.name ? user.name.split(" ")[0] : "Host"}
                </h2>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ffd180", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                    👤
                </div>
            </div>

            {/* Stats Card - Earnings */}
            <div style={{
                background: "#4285f4",
                color: "white",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "0 8px 20px rgba(66, 133, 244, 0.3)"
            }}>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>Upcoming Earnings</p>
                <h1 style={{ fontSize: "42px", fontWeight: "700", margin: "8px 0" }}>$1,250.00</h1>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>Based on your next 3 bookings</p>
            </div>

            {/* Secondary Stats */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
                <div style={{ flex: 1, background: "#f7f7f7", borderRadius: "20px", padding: "20px" }}>
                    <p style={{ margin: "0 0 8px 0", color: "#717171", fontSize: "14px" }}>Total Bookings</p>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#222" }}>28</h3>
                </div>
                <div style={{ flex: 1, background: "#f7f7f7", borderRadius: "20px", padding: "20px" }}>
                    <p style={{ margin: "0 0 8px 0", color: "#717171", fontSize: "14px" }}>5-Star Reviews</p>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#222" }}>15</h3>
                </div>
            </div>

            {/* Upcoming Bookings */}
            <div style={{ background: "#f7f7f7", borderRadius: "24px", padding: "24px", marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#222" }}>Upcoming Bookings</h3>
                    <button style={{ background: "none", border: "none", color: "#4285f4", fontWeight: "600", cursor: "pointer" }}>View All</button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                        { name: "Sarah L.", date: "Oct 24-28", place: "Seaside Villa", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                        { name: "Mark J.", date: "Nov 02-05", place: "Downtown Loft", img: "https://randomuser.me/api/portraits/men/32.jpg" }
                    ].map((booking, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <img src={booking.img} alt={booking.name} style={{ width: "48px", height: "48px", borderRadius: "50%" }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#222" }}>{booking.name}</h4>
                                    <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "#717171" }}>{booking.place}, {booking.date}</p>
                                </div>
                            </div>
                            <span style={{ color: "#717171", fontSize: "20px" }}>›</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* My Listings */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#222" }}>My Listings</h3>
                    <button style={{ background: "none", border: "none", color: "#4285f4", fontWeight: "600", cursor: "pointer" }}>View All</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                    {properties.length === 0 ? (
                        <p style={{ gridColumn: "1 / -1", color: "#717171" }}>No properties listed yet.</p>
                    ) : (
                        properties.map((p) => (
                            <div
                                key={p._id}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/property/${p._id}`)}
                            >
                                <img
                                    src={(p.images && p.images[0]) || "https://source.unsplash.com/400x300/?house"}
                                    alt="property"
                                    style={{ width: "100%", height: "140px", borderRadius: "16px", objectFit: "cover", marginBottom: "8px" }}
                                />
                                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#222" }}>{p.title}</h4>
                                <p style={{ margin: "2px 0 0 0", fontSize: "14px", color: "#717171" }}>Published</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* FAB */}
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
                    boxShadow: "0 4px 20px rgba(66, 133, 244, 0.4)",
                    cursor: "pointer",
                    zIndex: 100
                }}
            >
                +
            </button>
        </div>
    );
}
