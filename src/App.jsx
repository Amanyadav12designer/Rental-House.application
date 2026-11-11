import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "leaflet/dist/leaflet.css";
import ListingPage from "./pages/ListingPage";

import "./App.css";

export default function App() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const[propertyType,setPropertyType]= useState("");
  const [search, setSearch] = useState("");
 const [rentRange, setRentRange] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filter, setFilter] = useState("all");
  const [feedbackMessage, setFeedbackMessage] = useState({ id: null, text: "" });

  const [successMessage, setSuccessMessage] = useState("");
  const [successDeleteMessage, setSuccessDeleteMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


 async function loadProperties() {
  try {
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/properties`
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("API did not return an array");
    }

    setProperties(data.properties||[]);

  } catch (error) {
    console.error("Error loading properties:", error);
    setProperties([]);

  } finally {
    setLoading(false);
  }
}
  
  



  function handleLogout() {
    localStorage.removeItem("token");
 
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
          p._id === id ? { ...p, favorite: updated.property.favorite } : p
        )
      );

      setFeedbackMessage({
        id,
        text: updated.property.favorite
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

 if(rentRange){

filteredProperties= filteredProperties.filter(p=>{

  const rent= p.rent;

  const [min,max]= rentRange.split(",").map(Number);

  return rent>=min && rent<=max;
  
})
}


if(propertyType){

  filteredProperties= filteredProperties.filter(p=>p.propertyType?.toLowerCase()===propertyType.toLowerCase());
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
      <Route path="/" element={<Navigate to="/Signup" />} />


      <Route path="/Signup"

      element={<SignupPage/>}/>

      {/* Hidden admin login */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/Home" /> : <LoginPage  />
        }
      />

      <Route
      path="/HomePage"
      element={token?<HomePage/>:<Navigate to ="/Login"/>}/>


      <Route
        path="/home"
        element={
          <HomePage

          propertyType={propertyType}
          setPropertyType={setPropertyType}

         rentRange={rentRange}
          setRentRange={setRentRange}
          search={search}
          setSearch={setSearch}
       
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
            
          />
        }
      />

      <Route 

      path="/listing"
      element={

        <ListingPage

           properties={filteredProperties}
            onAdd={addProperty}
            successFeedback={successMessage}
            onFavorite={toggleFavorite}
            onToggle={toggleAvailability}
            onDelete={deleteProperty}
        
            message={feedbackMessage}
          
            onLogout={handleLogout}
            search={search}
            setSearch={setSearch}
          
           rentRange={rentRange}
            setRentRange={setRentRange}
         
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            filter={filter}
            deletedMessage={successDeleteMessage}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            loading={loading}

        />
        
      }

      />
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

    
    </Routes>
  );
}









