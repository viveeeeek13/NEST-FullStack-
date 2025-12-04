import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setMsg("");
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Signup successful! Redirecting...");
        navigate("/login");
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "24px", textAlign: "center", color: "#222" }}>Create an Account</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>
        <button onClick={handleSignup} style={buttonStyle}>
          Sign up
        </button>
        <p style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "14px" }}>{msg}</p>
        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#717171" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1a73e8", fontWeight: "600" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#ffffff",
};

const cardStyle = {
  padding: "40px",
  width: "100%",
  maxWidth: "400px",
  background: "white",
  borderRadius: "16px",
  border: "1px solid #e0e0e0",
  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none",
  background: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#1a73e8",
  border: "none",
  color: "white",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
};
