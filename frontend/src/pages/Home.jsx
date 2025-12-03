import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f7",
        fontFamily: "Arial",
      }}>
      <h1
        style={{
          fontSize: "42px",
          color: "#333",
          marginBottom: "10px",
          fontWeight: "700",
        }}
      >
        Welcome to NEST 🏡
      </h1>
      <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px" }}>
        Find your perfect stay, just like Airbnb.
      </p>
      <div>
        <Link to="/login">
          <button
            style={{
              padding: "12px 28px",
              marginRight: "15px",
              background: "#ff385c",
              border: "none",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button
            style={{
              padding: "12px 28px",
              background: "#333",
              border: "none",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}