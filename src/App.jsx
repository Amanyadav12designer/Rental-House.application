import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "leaflet/dist/leaflet.css";

import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filter, setFilter] = useState("all");
  const [feedbackMessage, setFeedbackMessage] = useState({ id: null, text: "" });
  const [role, setRole] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLandlord = role?.toLowerCase() === "landlord";

  async function loadProperties() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
    const data = await res.json();
    setProperties(data);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  function handleLogin(userRole) {
    setRole(userRole);
    navigate("/home");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/landlord-login");
  }

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

      if (!res.ok) throw new Error();

      await loadProperties();
      setSuccessMessage("Property added ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setFeedbackMessage({ id: null, text: "Error adding property ❌" });
    }
  }

  async function deleteProperty(id) {
    if (!isLandlord) return alert("Only landlord can delete");

    const confirmDelete = window.confirm("Delete property?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setProperties(prev => prev.filter(p => p._id !== id));
      setSuccessDeleteMessage("Property deleted ✅");
      setTimeout(() => setSuccessDeleteMessage(""), 3000);
    } catch {
      alert("Delete failed");
    }
  }

  async function toggleFavorite(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties/${id}/favorite`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = await res.json();

      setProperties(prev =>
        prev.map(p =>
          p._id === id ? { ...p, favorite: updated.favorite } : p
        )
      );

      setFeedbackMessage({
        id,
        text: updated.favorite
          ? "Added to favorites!"
          : "Removed from favorites!",
      });

      setTimeout(() => setFeedbackMessage({ id: null, text: "" }), 3000);
    } catch {
      alert("Favorite failed");
    }
  }

  function toggleAvailability(id) {
    setProperties(prev =>
      prev.map(p =>
        p._id === id ? { ...p, available: !p.available } : p
      )
    );
  }

  let filteredProperties = [...properties];

  if (search) {
    filteredProperties = filteredProperties.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (minRent) {
    filteredProperties = filteredProperties.filter(p => p.rent >= Number(minRent));
  }

  if (maxRent) {
    filteredProperties = filteredProperties.filter(p => p.rent <= Number(maxRent));
  }

  if (searchLocation) {
    filteredProperties = filteredProperties.filter(p =>
      p.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }

  if (filter === "favorite") {
    filteredProperties = filteredProperties.filter(p => p.favorite);
  }

  return (
    <Routes>
      {/* Public homepage */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* Hidden admin login */}
      <Route
        path="/landlord-login"
        element={
          token ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />
        }
      />

      {/* Optional hidden signup */}
      <Route
        path="/signup"
        element={<SignupPage setRole={setRole} />}
      />

      {/* Public Home */}
      <Route
        path="/home"
        element={
          <HomePage
            properties={filteredProperties}
            onAdd={addProperty}
            successFeedback={successMessage}
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
            setSearchLocation={setSearchLocation}
            filter={filter}
            deletedMessage={successDeleteMessage}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        }
      />

      {/* Favorites public */}
      <Route
        path="/favorites"
        element={
          <FavoritePage
            properties={properties.filter(p => p.favorite)}
            onFavorite={toggleFavorite}
            onDelete={deleteProperty}
          />
        }
      />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}









