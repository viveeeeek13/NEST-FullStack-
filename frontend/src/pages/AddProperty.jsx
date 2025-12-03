import { useState,useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProperty(){
    const navigate =useNavigate();
    const [title,setTitle]=useState("");
    const [city,setCity]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState("");
    const [description,setDescription]=useState("");
    const [msg,setMsg]=useState("")

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
    },[]);

    const handleAdd=async()=>{
        if(!title || !city || !price || !image || !description){
            return setMsg("All fields are required")
        }
    try {
        const token = localStorage.getItem("token");
        const res=await fetch(`${API}/properties`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, price, location: city, images: [image] })
        })
        const data=await res.json()
        if(res.ok){
            setMsg("Property added successfully!");
            setTimeout(() => navigate("/dashboard"), 1200);
        }else{
            setMsg(data.message || "Failed to add property");
        }
    }catch(err){
        console.error(err);
        setMsg("Something went wrong")
    }
}

return (
    <div style={pageStyle}>
      <div style={formCard}>
        <h2 style={{ marginBottom: "20px" }}>Add New Property 🏡</h2>

        <input
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Price per Night (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <button onClick={handleAdd} style={buttonStyle}>
          Add Property
        </button>

        <p style={{ color: "red", marginTop: "10px" }}>{msg}</p>
      </div>
    </div>
  );
}

const pageStyle = {
  padding: "30px",
  minHeight: "100vh",
  background: "#f7f7f7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
};
const formCard = {
  width: "420px",
  background: "white",
  padding: "35px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};
const textareaStyle = {
  width: "100%",
  padding: "12px",
  height: "110px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  resize: "none",
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