import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setMsg(data.message || "Login failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "24px", textAlign: "center", color: "#222" }}>Welcome Back</h2>
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
        <button onClick={handleLogin} style={buttonStyle}>
          Log in
        </button>
        <p style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "14px" }}>{msg}</p>
        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#717171" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#1a73e8", fontWeight: "600" }}>
            Sign up
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
  transition: "0.2s",
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
