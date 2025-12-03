import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [msg, setMsg] = useState("");

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
        window.location.href = "/login";
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fafafa",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          padding: "40px",
          width: "380px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Signup</h2>

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
          Signup
        </button>

        <p style={{ color: "red" }}>{msg}</p>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff385c" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#ff385c",
  border: "none",
  color: "white",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};
