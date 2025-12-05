import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setMsg("");
      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div style={pageStyle}>
      {/* Animated Background */}
      <div style={backgroundOverlay}></div>

      {/* Floating Shapes */}
      <div style={shape1}></div>
      <div style={shape2}></div>
      <div style={shape3}></div>

      {/* Signup Card */}
      <div style={cardStyle}>
        {/* Logo/Icon */}
        <div style={logoContainer}>
          <div style={logoCircle}>✨</div>
        </div>

        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Start your journey with NEST today</p>

        {/* Input Fields */}
        <div style={inputContainer}>
          <div style={inputWrapper}>
            <span style={inputIcon}>👤</span>
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#FF385C"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"}
            />
          </div>

          <div style={inputWrapper}>
            <span style={inputIcon}>✉️</span>
            <input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#FF385C"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"}
            />
          </div>

          <div style={inputWrapper}>
            <span style={inputIcon}>🔒</span>
            <input
              placeholder="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#FF385C"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"}
            />
          </div>
        </div>

        {/* Message */}
        {msg && (
          <p style={msg.includes("successful") ? successStyle : errorStyle}>{msg}</p>
        )}

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 56, 92, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 56, 92, 0.3)";
          }}
        >
          Create Account
        </button>

        {/* Terms */}
        <p style={termsStyle}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Divider */}
        <div style={dividerContainer}>
          <div style={dividerLine}></div>
          <span style={dividerText}>or</span>
          <div style={dividerLine}></div>
        </div>

        {/* Login Link */}
        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

// Styles
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  position: "relative",
  overflow: "hidden",
  padding: "20px"
};

const backgroundOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "radial-gradient(circle at 30% 40%, rgba(240, 147, 251, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(245, 87, 108, 0.3) 0%, transparent 50%)",
  animation: "pulse 8s ease-in-out infinite",
  zIndex: 0
};

const shape1 = {
  position: "absolute",
  width: "350px",
  height: "350px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.1)",
  top: "-150px",
  right: "-100px",
  animation: "float 18s ease-in-out infinite",
  zIndex: 0
};

const shape2 = {
  position: "absolute",
  width: "250px",
  height: "250px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.08)",
  bottom: "100px",
  left: "50px",
  animation: "float 22s ease-in-out infinite reverse",
  zIndex: 0
};

const shape3 = {
  position: "absolute",
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.06)",
  top: "40%",
  left: "-60px",
  animation: "float 16s ease-in-out infinite",
  zIndex: 0
};

const cardStyle = {
  padding: "48px 40px",
  width: "100%",
  maxWidth: "450px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  position: "relative",
  zIndex: 1,
  animation: "slideUp 0.6s ease-out"
};

const logoContainer = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "24px"
};

const logoCircle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "36px",
  boxShadow: "0 8px 24px rgba(245, 87, 108, 0.4)",
  animation: "bounce 2s ease-in-out infinite"
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "800",
  color: "white",
  textAlign: "center",
  marginBottom: "8px",
  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
};

const subtitleStyle = {
  fontSize: "16px",
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  marginBottom: "32px"
};

const inputContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "16px"
};

const inputWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center"
};

const inputIcon = {
  position: "absolute",
  left: "18px",
  fontSize: "20px",
  zIndex: 1
};

const inputStyle = {
  width: "100%",
  padding: "16px 16px 16px 56px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  fontSize: "16px",
  outline: "none",
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  transition: "all 0.3s ease",
  fontFamily: "Science Gothic, sans-serif"
};

const errorStyle = {
  color: "#FFE5E5",
  background: "rgba(255, 56, 92, 0.3)",
  padding: "12px",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "16px",
  border: "1px solid rgba(255, 56, 92, 0.5)"
};

const successStyle = {
  color: "#E5FFE5",
  background: "rgba(76, 175, 80, 0.3)",
  padding: "12px",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "16px",
  border: "1px solid rgba(76, 175, 80, 0.5)"
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  border: "none",
  color: "white",
  borderRadius: "12px",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "8px",
  boxShadow: "0 8px 24px rgba(245, 87, 108, 0.3)",
  transition: "all 0.3s ease",
  fontFamily: "Science Gothic, sans-serif"
};

const termsStyle = {
  fontSize: "12px",
  color: "rgba(255, 255, 255, 0.7)",
  textAlign: "center",
  marginTop: "16px",
  lineHeight: "1.5"
};

const dividerContainer = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  margin: "24px 0"
};

const dividerLine = {
  flex: 1,
  height: "1px",
  background: "rgba(255, 255, 255, 0.3)"
};

const dividerText = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "14px",
  fontWeight: "500"
};

const footerText = {
  textAlign: "center",
  fontSize: "15px",
  color: "rgba(255, 255, 255, 0.9)",
  margin: 0
};

const linkStyle = {
  color: "white",
  fontWeight: "700",
  textDecoration: "none",
  borderBottom: "2px solid white",
  paddingBottom: "2px",
  transition: "all 0.3s ease"
};
