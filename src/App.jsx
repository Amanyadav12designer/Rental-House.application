import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filter, setFilter] = useState("all");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");
  const isLandlord = role === "landlord";

  // ---------------- LOAD PROPERTIES ----------------
  async function loadProperties() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  // ---------------- AUTH ----------------
  function handleLogin(userRole) {
    setRole(userRole);
    navigate("/home");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/login");
  }

  // ---------------- ADD PROPERTY ----------------
  async function addProperty(newProperty) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProperty),
      });

      if (!res.ok) throw new Error("Failed to add");

      await loadProperties();
      alert("Property added ✅");
    } catch (err) {
      alert("Error adding property ❌");
    }
  }

  // ---------------- DELETE PROPERTY ----------------
  async function deleteProperty(id) {
    if (!isLandlord) {
      alert("Only landlord can delete");
      return;
    }

    const confirmDelete = window.confirm("Delete property?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  }

  // ---------------- TOGGLE FAVORITE ----------------
  async function toggleFavorite(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}/favorite`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setProperties(prev =>
        prev.map(p =>
          p.id === id ? { ...p, favorite: !p.favorite } : p
        )
      );

      setFeedbackMessage("Added to favorites!");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (err) {
      alert("Error toggling favorite");
    }
  }

  function toggleAvailability(id){
    setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, available: !p.available } : p
      )
    );
  }

  // ---------------- FILTERS ----------------
  let filteredProperties = [...properties];

  if (search) {
    filteredProperties = filteredProperties.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (minRent) {
    filteredProperties = filteredProperties.filter(
      p => p.rent >= Number(minRent)
    );
  }

  if (maxRent) {
    filteredProperties = filteredProperties.filter(
      p => p.rent <= Number(maxRent)
    );
  }

  if (searchLocation) {
    filteredProperties = filteredProperties.filter(p =>
      p.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }

  if (filter === "favorite") {
    filteredProperties = filteredProperties.filter(p => p.favorite);
  }


  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }}, []);

  // ---------------- ROUTES ----------------
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to={token ?  "/home" : "/login"} />} />

      {/* AUTH */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/signup"
        element={
          token ? <Navigate to="/login" /> : <SignupPage setRole={setRole} />
        }
      />

      {/* PROTECTED */}
      <Route
        path="/home"
        element={
          token ? (
            <HomePage
              properties={filteredProperties}
              onAdd={addProperty}
            
              onFavorite={toggleFavorite}
              onToggle={toggleAvailability}
              onDelete={deleteProperty}
              isLandlord={isLandlord}
              message={feedbackMessage}
              role={role}
              onLogout={handleLogout}
              search={search}
              setSearch={setSearch}
              minRent={minRent}
              setMinRent={setMinRent}
              maxRent={maxRent}
              setMaxRent={setMaxRent}
              searchLocation={searchLocation}
              setSeachLocation={setSearchLocation}
              filter={filter}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/favorites"
        element={
          token ? (
            <FavoritePage
              properties={properties.filter(p => p.favorite)}
              onFavorite={toggleFavorite}
              onDelete={deleteProperty}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}








