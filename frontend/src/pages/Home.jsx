import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Home() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = (searchQuery = "") => {
    setLoading(true);
    const url = searchQuery
      ? `${API}/properties?search=${encodeURIComponent(searchQuery)}`
      : `${API}/properties`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch properties:", err);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    fetchProperties(searchLocation);
  };

  return (
    <div style={{ paddingBottom: "60px" }}>
      {/* Hero Section with Search */}
      <div style={{
        position: "relative",
        height: "500px",
        backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-27b88e35eabb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {/* Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))"
        }}></div>

        {/* Hero Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white",
          maxWidth: "800px",
          padding: "0 20px"
        }}>
          <h1 style={{
            fontSize: "56px",
            fontWeight: "800",
            marginBottom: "16px",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)"
          }}>
            Find Your Perfect Stay
          </h1>
          <p style={{
            fontSize: "20px",
            fontWeight: "500",
            marginBottom: "40px",
            textShadow: "0 1px 4px rgba(0,0,0,0.3)"
          }}>
            Discover unique homes and experiences around the world
          </p>

          {/* Search Card */}
          <div style={{
            background: "white",
            borderRadius: "60px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 24px"
            }}>
              <span style={{ fontSize: "20px" }}>📍</span>
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  width: "100%",
                  color: "#222"
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              style={{
                background: "#FF385C",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#E31C5F"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#FF385C"}
            >
              <span>🔍</span>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 20px"
      }}>
        {/* Section Title */}
        <div style={{ marginBottom: "32px" }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#222",
            marginBottom: "8px"
          }}>
            Explore Nearby Stays
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#717171"
          }}>
            Discover amazing places to stay near you
          </p>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "18px", color: "#717171" }}>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "18px", color: "#717171" }}>No properties available at the moment.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "32px"
          }}>
            {properties.map((property) => (
              <div
                key={property._id}
                onClick={() => navigate(`/property/${property._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Property Image */}
                <div style={{ position: "relative", marginBottom: "12px" }}>
                  <img
                    src={(property.images && property.images[0]) || "https://images.unsplash.com/photo-1600596542815-27b88e35eabb?w=600"}
                    alt={property.title}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      borderRadius: "16px"
                    }}
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px"
                    }}
                  >
                    ♡
                  </button>
                </div>

                {/* Property Info */}
                <div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px"
                  }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#222",
                      margin: 0
                    }}>
                      {property.location || "Beautiful Location"}
                    </h3>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      <span style={{ fontSize: "14px" }}>⭐</span>
                      <span style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#222"
                      }}>
                        {property.rating || "4.9"}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: "15px",
                    color: "#717171",
                    margin: "4px 0"
                  }}>
                    {property.title}
                  </p>

                  <p style={{
                    fontSize: "15px",
                    color: "#717171",
                    margin: "4px 0"
                  }}>
                    {property.guests || "2-4"} guests · {property.bedrooms || "2"} bedrooms
                  </p>

                  <div style={{ marginTop: "8px" }}>
                    <span style={{
                      fontSize: "17px",
                      fontWeight: "600",
                      color: "#222"
                    }}>
                      ₹{property.price || "3,500"}
                    </span>
                    <span style={{
                      fontSize: "15px",
                      color: "#717171"
                    }}>
                      {" "}/ night
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspiration Section */}
      <div style={{
        background: "#F7F7F7",
        padding: "60px 20px",
        marginTop: "60px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#222",
            marginBottom: "32px"
          }}>
            Inspiration for your next trip
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px"
          }}>
            {[
              { city: "Mumbai", distance: "2 hour drive", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400" },
              { city: "Goa", distance: "4 hour drive", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400" },
              { city: "Bangalore", distance: "1 hour flight", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400" },
              { city: "Jaipur", distance: "3 hour drive", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400" }
            ].map((destination, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "16px",
                  cursor: "pointer"
                }}
              >
                <img
                  src={destination.img}
                  alt={destination.city}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    objectFit: "cover"
                  }}
                />
                <div>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#222",
                    margin: "0 0 4px 0"
                  }}>
                    {destination.city}
                  </h4>
                  <p style={{
                    fontSize: "14px",
                    color: "#717171",
                    margin: 0
                  }}>
                    {destination.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
