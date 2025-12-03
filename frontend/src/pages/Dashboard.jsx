import {useState,useEffect} from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate=useNavigate();
    const [properties,setProperties]=useState([]);
    const [user,setUser]=useState(null);
    useEffect(()=>{
      const token=localStorage.getItem("token");
      if(!token) return navigate("/login")
        fetch(`${API}/auth/me`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => navigate("/login"));
    },[]);  
    

    useEffect(()=>{
      const token=localStorage.getItem("token");
        fetch(`${API}/properties`,{
          headers:{Authorization:`Bearer ${token}`}
        })
        .then(res=>res.json())
        .then(data=>setProperties(data.properties || []))
        .catch((err)=>console.log(err))
    },[]);

    const handleLogout=()=>{
      localStorage.removeItem("token")
      navigate("/login")
    }


    return (
      <div style={pageStyle}>
        <div style={navStyle}>
          <h2 style={{ margin: 0 }}>NEST Dashboard</h2>
  
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "20px", fontWeight: "600" }}>
              Hi, {user?.name || "Guest"} 👋
            </p>
            <button onClick={handleLogout} style={logoutButton}>
              Logout
            </button>
          </div>
        </div>
  
        <h3 style={{ marginTop: "30px" }}>Available Properties</h3>
        <div style={cardContainer}>
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((p) => (
              <div key={p._id} style={card}>
                <img
                  src={(p.images && p.images[0]) || "https://source.unsplash.com/400x300/?house"}
                  alt="property"
                  style={cardImg}
                />
                <h4 style={{ margin: "10px 0" }}>{p.title}</h4>
                <p style={{ color: "#555" }}>{p.location}</p>
                <p style={{ fontWeight: "600", marginTop: "5px" }}>
                  ₹{p.price}/night
                </p>
  
                <button style={viewButton}>View Details</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  const pageStyle = {
    padding: "30px",
    fontFamily: "Arial",
    background: "#fafafa",
    minHeight: "100vh",
  };
  
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "15px 25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };
  
  const logoutButton = {
    background: "#ff385c",
    border: "none",
    padding: "8px 15px",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  };
  
  const cardContainer = {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  };
  
  const card = {
    background: "white",
    borderRadius: "12px",
    padding: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s",
  };
  
  const cardImg = {
    width: "100%",
    height: "180px",
    borderRadius: "10px",
    objectFit: "cover",
  };
  
  const viewButton = {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };