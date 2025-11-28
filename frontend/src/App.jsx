import { useState } from "react";
import "./App.css";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");

    const res = await fetch("http://localhost:10000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) return setMessage(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    setMessage("Login Success!");
  };

  // SIGNUP API
  const handleSignup = async () => {
    setMessage("");

    const res = await fetch("http://localhost:10000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) return setMessage(data.message || "Signup failed");

    setMessage("Signup Successful! You can now login.");
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* Title */}
        <h1 className="title">
          {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
        </h1>
        <p className="subtitle">
          {isLogin ? "Login to continue" : "Join us today"}
        </p>
        {!isLogin && (
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="login-btn"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        {message && <p className="message">{message}</p>}
        <p className="switch-text">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
