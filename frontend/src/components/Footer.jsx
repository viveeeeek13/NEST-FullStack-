import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer style={{ background: "#f7f7f7", padding: "40px 20px", marginTop: "60px" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>

                {/* Brand Column */}
                <div>
                    <div style={{ fontWeight: "800", fontSize: "20px", color: "#1a73e8", marginBottom: "15px", display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ fontSize: "20px" }}>⌂</span> NEST
                    </div>
                    <p style={{ color: "#717171", fontSize: "14px", lineHeight: "1.6" }}>
                        Book unique spaces designed for modern living.
                    </p>
                </div>

                {/* Links Columns */}
                <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>Company</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>About</Link></li>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Careers</Link></li>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Press</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>Support</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Help Center</Link></li>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Contact Us</Link></li>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Trust & Safety</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>Legal</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Terms of Service</Link></li>
                        <li><Link to="#" style={{ color: "#717171", fontSize: "14px" }}>Privacy Policy</Link></li>
                    </ul>
                </div>

            </div>

            <div style={{ borderTop: "1px solid #ddd", marginTop: "40px", paddingTop: "20px", textAlign: "center", color: "#717171", fontSize: "12px" }}>
                © 2024 NEST. All rights reserved.
            </div>
        </footer>
    );
}
