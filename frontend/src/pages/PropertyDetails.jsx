import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(2);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch(`${API}/properties/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProperty(data.property);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ marginTop: "40px", textAlign: "center" }}>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="container" style={{ marginTop: "40px", textAlign: "center" }}>
                <p>Property not found</p>
                <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px", background: "#1a73e8", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                    Back to Home
                </button>
            </div>
        );
    }

    const images = property.images && property.images.length > 0 ? property.images : ["https://source.unsplash.com/800x600/?house"];
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 4;
    const subtotal = property.price * nights;
    const cleaningFee = 125;
    const serviceFee = 213;
    const total = subtotal + cleaningFee + serviceFee;

    const amenities = [
        { icon: "📶", name: "High-speed Wi-Fi" },
        { icon: "🍳", name: "Fully equipped kitchen" },
        { icon: "📺", name: '65" 4K Smart TV' },
        { icon: "🅿️", name: "Free dedicated parking" },
        { icon: "🏋️", name: "Building gym access" },
        { icon: "🏠", name: "Private balcony" }
    ];

    return (
        <div style={{ background: "#fff", minHeight: "100vh", paddingBottom: "40px" }}>
            <div className="container" style={{ marginTop: "20px", maxWidth: "1200px" }}>
                {/* Header */}
                <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "20px 0 8px 0", color: "#222" }}>
                    {property.title}
                </h1>
                <p style={{ margin: "0 0 20px 0", color: "#717171", fontSize: "14px" }}>
                    {property.location}
                </p>

                {/* Image Gallery */}
                <div style={{ position: "relative", marginBottom: "32px" }}>
                    <img
                        src={images[currentImageIndex]}
                        alt={property.title}
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                            borderRadius: "16px"
                        }}
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
                                style={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.9)",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
                                style={{
                                    position: "absolute",
                                    right: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.9)",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                ›
                            </button>
                            <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
                                {images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            width: "8px",
                                            height: "8px",
                                            borderRadius: "50%",
                                            background: idx === currentImageIndex ? "white" : "rgba(255,255,255,0.5)",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => setCurrentImageIndex(idx)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px" }}>
                    {/* Left Column */}
                    <div>
                        {/* Host Info */}
                        <div style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "24px", marginBottom: "24px" }}>
                            <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 16px 0", color: "#222" }}>
                                Entire loft hosted by Jane
                            </h2>
                            <p style={{ margin: "0 0 16px 0", color: "#717171", fontSize: "14px" }}>
                                2 guests · 2 bedrooms · 2 beds · 1 bath
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#ffd180", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                                    👤
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: "600", color: "#222" }}>Jane</p>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#717171" }}>Superhost</p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "24px", marginBottom: "24px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
                                <span style={{ fontSize: "24px" }}>🔑</span>
                                <div>
                                    <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#222" }}>Self check-in</h3>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#717171" }}>Check yourself in with the smartlock.</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                <span style={{ fontSize: "24px" }}>⭐</span>
                                <div>
                                    <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#222" }}>Jane is a Superhost</h3>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#717171" }}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "24px", marginBottom: "24px" }}>
                            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "600", color: "#222" }}>About this space</h3>
                            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6", color: "#222" }}>
                                {property.description || "Experience the best of city living in this stunning, light-filled loft. With panoramic views of the downtown skyline, a fully equipped modern kitchen, and amenities galore, this is the perfect urban retreat. The open-concept living space is ideal for relaxing after a day of exploring."}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: "600", color: "#222" }}>What this place offers</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                {amenities.map((amenity, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{ fontSize: "20px" }}>{amenity.icon}</span>
                                        <span style={{ fontSize: "15px", color: "#222" }}>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div>
                        <div style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "16px",
                            padding: "24px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            position: "sticky",
                            top: "20px"
                        }}>
                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ fontSize: "22px", fontWeight: "700", color: "#222" }}>₹{property.price}</span>
                                <span style={{ fontSize: "15px", color: "#717171" }}> / night</span>
                            </div>

                            {/* Date Inputs */}
                            <div style={{ marginBottom: "16px" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden" }}>
                                    <div style={{ padding: "12px", background: "#fff", borderRight: "1px solid #e0e0e0" }}>
                                        <label style={{ display: "block", fontSize: "10px", fontWeight: "600", color: "#222", marginBottom: "4px" }}>CHECK-IN</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            style={{ border: "none", outline: "none", fontSize: "14px", width: "100%", color: "#717171" }}
                                        />
                                    </div>
                                    <div style={{ padding: "12px", background: "#fff" }}>
                                        <label style={{ display: "block", fontSize: "10px", fontWeight: "600", color: "#222", marginBottom: "4px" }}>CHECK-OUT</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            style={{ border: "none", outline: "none", fontSize: "14px", width: "100%", color: "#717171" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Guests */}
                            <div style={{ marginBottom: "20px", padding: "12px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
                                <label style={{ display: "block", fontSize: "10px", fontWeight: "600", color: "#222", marginBottom: "4px" }}>GUESTS</label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    style={{ border: "none", outline: "none", fontSize: "14px", width: "100%", color: "#717171", background: "transparent" }}
                                >
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Reserve Button */}
                            <button style={{
                                width: "100%",
                                padding: "14px",
                                background: "#1a73e8",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginBottom: "16px"
                            }}>
                                Reserve
                            </button>

                            <p style={{ textAlign: "center", fontSize: "13px", color: "#717171", marginBottom: "20px" }}>
                                You won't be charged yet
                            </p>

                            {/* Price Breakdown */}
                            <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "15px", color: "#222", textDecoration: "underline" }}>₹{property.price} × {nights} nights</span>
                                    <span style={{ fontSize: "15px", color: "#222" }}>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <span style={{ fontSize: "15px", color: "#222", textDecoration: "underline" }}>Cleaning fee</span>
                                    <span style={{ fontSize: "15px", color: "#222" }}>₹{cleaningFee}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                                    <span style={{ fontSize: "15px", color: "#222", textDecoration: "underline" }}>Service fee</span>
                                    <span style={{ fontSize: "15px", color: "#222" }}>₹{serviceFee}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid #e0e0e0" }}>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>Total</span>
                                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
