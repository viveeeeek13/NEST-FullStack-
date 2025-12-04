import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMsg("Image size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setMsg("Please select a valid image file");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMsg("");
    }
  };

  const handleAdd = async () => {
    if (!title || !city || !price || !imageFile || !description) {
      return setMsg("All fields are required");
    }

    setUploading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onload = async () => {
        try {
          const res = await fetch(`${API}/properties`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title,
              description,
              price,
              location: city,
              images: [reader.result]
            })
          });

          const data = await res.json();

          if (res.ok) {
            setMsg("Property added successfully!");
            setTimeout(() => navigate("/dashboard"), 1200);
          } else {
            setMsg(data.message || "Failed to add property");
          }
        } catch (err) {
          console.error(err);
          setMsg("Something went wrong");
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        setMsg("Failed to read image file");
        setUploading(false);
      };
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong");
      setUploading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
      <div style={formCard}>
        <h2 style={{ marginBottom: "24px", color: "#222", fontSize: "24px", fontWeight: "700" }}>
          Add New Property 🏡
        </h2>

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

        {/* Image Upload */}
        <div style={{ marginBottom: "16px" }}>
          <label
            htmlFor="image-upload"
            style={{
              display: "block",
              padding: "14px",
              background: "#f9f9f9",
              border: "2px dashed #e0e0e0",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#1a73e8")}
            onMouseLeave={(e) => (e.target.style.borderColor = "#e0e0e0")}
          >
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <p style={{ margin: 0, fontSize: "14px", color: "#1a73e8" }}>
                  Click to change image
                </p>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: "32px" }}>📷</span>
                <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#717171" }}>
                  Click to upload property image
                </p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#999" }}>
                  Max size: 5MB
                </p>
              </div>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />

        <button
          onClick={handleAdd}
          style={{
            ...buttonStyle,
            opacity: uploading ? 0.6 : 1,
            cursor: uploading ? "not-allowed" : "pointer",
          }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Property"}
        </button>

        {msg && (
          <p
            style={{
              color: msg.includes("success") ? "green" : "red",
              marginTop: "10px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

const formCard = {
  width: "100%",
  maxWidth: "500px",
  background: "white",
  padding: "40px",
  borderRadius: "24px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  border: "1px solid #e0e0e0",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  fontSize: "16px",
  outline: "none",
  transition: "0.2s",
  background: "#f9f9f9",
};

const textareaStyle = {
  width: "100%",
  padding: "14px",
  height: "120px",
  marginBottom: "16px",
  borderRadius: "12px",
  border: "1px solid #e0e0e0",
  fontSize: "16px",
  resize: "none",
  outline: "none",
  background: "#f9f9f9",
  fontFamily: "inherit",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#1a73e8",
  border: "none",
  color: "white",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "8px",
};
