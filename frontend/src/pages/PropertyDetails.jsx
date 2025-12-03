import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/properties/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load property");
        setProperty(data.property);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={pageStyle}>Loading...</div>;
  if (error) return <div style={pageStyle}>{error}</div>;

  return (
    <div style={pageStyle}>
      <div style={container}>
        <img
          src={(property.images && property.images[0]) || "https://source.unsplash.com/800x500/?house"}
          alt="property"
          style={heroImg}
        />
        <h2 style={{ margin: "16px 0" }}>{property.title}</h2>
        <p style={{ color: "#555" }}>{property.location}</p>
        <p style={{ fontWeight: 600, marginTop: 8 }}>₹{property.price}/night</p>
        <p style={{ marginTop: 12 }}>{property.description}</p>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#fafafa",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
};
const container = {
  width: "800px",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};
const heroImg = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
  borderRadius: "10px",
};
