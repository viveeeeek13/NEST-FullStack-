import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        setMsg(data.message || "Login failed");
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
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
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
          Login
        </button>
        <p style={{ color: "red" }}>{msg}</p>
        <p style={{ marginTop: "10px" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#ff385c" }}>
            Signup
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
