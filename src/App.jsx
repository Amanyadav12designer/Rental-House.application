
import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ListingPage from "./pages/ListingPage";

import "leaflet/dist/leaflet.css";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  // AUTHENTICATION
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  // PROPERTY STATE
  const [properties, setProperties] = useState([]);

  const [propertyType, setPropertyType] = useState("");
  const [search, setSearch] = useState("");
  const [rentRange, setRentRange] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [filter, setFilter] = useState("all");

  // UI STATE
  const [feedbackMessage, setFeedbackMessage] = useState({
    id: null,
    text: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // LOAD PROPERTIES

  async function loadProperties() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/properties`);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      const propertyData = Array.isArray(data)
        ? data
        : data.properties;

      if (!Array.isArray(propertyData)) {
        throw new Error("Invalid properties response");
      }

      setProperties(propertyData);

    } catch (error) {
      console.error("Error loading properties:", error);
      setProperties([]);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  // LOGIN

  function handleLogin(data) {
    if (!data.token) {
      console.error("Token missing from login response");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);

    navigate("/home");
  }

  // LOGOUT

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);

    navigate("/login");
  }

  // ADD PROPERTY

  async function addProperty(newProperty) {
    try {
      const res = await fetch(`${API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProperty),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error adding property");
      }

      await loadProperties();

      setSuccessMessage("Property added successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error("Add property error:", error);

      setFeedbackMessage({
        id: null,
        text: error.message || "Error adding property",
      });
    }
  }

  // DELETE PROPERTY

  async function deleteProperty(id) {
    const confirmDelete = window.confirm("Delete property?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setProperties(prev =>
        prev.filter(p =>
          String(p._id || p.id) !== String(id)
        )
      );

      setSuccessDeleteMessage("Property deleted successfully!");

      setTimeout(() => {
        setSuccessDeleteMessage("");
      }, 3000);

    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Delete failed");
    }
  }

  // TOGGLE FAVORITE

  async function toggleFavorite(id) {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/properties/${id}/favorite`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Favorite failed");
      }

      const updatedProperty = data.property || data;

      if (typeof updatedProperty.favorite !== "boolean") {
        throw new Error("Invalid favorite response");
      }

      setProperties(prev =>
        prev.map(p =>
          String(p._id || p.id) === String(id)
            ? { ...p, favorite: updatedProperty.favorite }
            : p
        )
      );

      setFeedbackMessage({
        id,
        text: updatedProperty.favorite
          ? "Added to favorites!"
          : "Removed from favorites!",
      });

      setTimeout(() => {
        setFeedbackMessage({
          id: null,
          text: "",
        });
      }, 3000);

    } catch (error) {
      console.error("Favorite error:", error);
      alert(error.message || "Favorite failed");
    }
  }

  // TOGGLE AVAILABILITY

  async function toggleAvailability(id) {
    const property = properties.find(
      p => String(p._id || p.id) === String(id)
    );

    if (!property) return;

    const newAvailability = !property.available;

    try {
      const res = await fetch(
        `${API_URL}/api/properties/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            available: newAvailability,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      const updatedProperty = data.property || data;

      setProperties(prev =>
        prev.map(p =>
          String(p._id || p.id) === String(id)
            ? { ...p, ...updatedProperty }
            : p
        )
      );

    } catch (error) {
      console.error("Availability error:", error);
      alert(error.message || "Availability update failed");
    }
  }

  // SEARCH AND FILTER

  let filteredProperties = [...properties];

  if (search.trim()) {
    filteredProperties = filteredProperties.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (rentRange) {
    const [min, max] = rentRange.split(",").map(Number);

    filteredProperties = filteredProperties.filter(p =>
      p.rent >= min && p.rent <= max
    );
  }

  if (propertyType) {
    filteredProperties = filteredProperties.filter(p =>
      p.propertyType?.toLowerCase() === propertyType.toLowerCase()
    );
  }

  if (searchLocation.trim()) {
    filteredProperties = filteredProperties.filter(p =>
      p.location?.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }

  if (filter === "favorite") {
    filteredProperties = filteredProperties.filter(p => p.favorite);
  }

  // ROUTES

  return (
    <Routes>

      {/* DEFAULT ROUTE */}

      <Route
        path="/"
        element={
          <Navigate to=
             "/signup"
            replace
          />
        }
      />

      {/* SIGNUP */}

      <Route
        path="/signup"
        element={
          <SignupPage />
        }
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={
       
            <LoginPage onLogin={handleLogin} />
        }
      />

      {/* HOME */}

      <Route
        path="/home"
        element={
          token ? (
            <HomePage
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              rentRange={rentRange}
              setRentRange={setRentRange}
              search={search}
              setSearch={setSearch}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* LISTING */}

      <Route
        path="/listing"
        element={
          token ? (
            <ListingPage
              properties={filteredProperties}
              onAdd={addProperty}
              onFavorite={toggleFavorite}
              onToggle={toggleAvailability}
              onDelete={deleteProperty}
              message={feedbackMessage}
              successFeedback={successMessage}
              deletedMessage={successDeleteMessage}
              search={search}
              setSearch={setSearch}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              rentRange={rentRange}
              setRentRange={setRentRange}
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              filter={filter}
              setFilter={setFilter}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              loading={loading}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* FAVORITES */}

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
            <Navigate to="/login" replace />
          )
        }
      />

      {/* OLD URL REDIRECTS */}

      <Route
        path="/Signup"
        element={<Navigate to="/signup" replace />}
      />

      <Route
        path="/HomePage"
        element={<Navigate to="/home" replace />}
      />

      {/* UNKNOWN ROUTES */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}










