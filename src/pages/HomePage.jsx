import { useState } from "react";
import AddPropertyForm from "../AddPropertyForm";
import PropertyList from "../PropertyList";
import { useLocation } from "react-router-dom";


export default function HomePage({ properties, onAdd, onToggleFav, onDelete }) {
  const location = useLocation();
const params = new URLSearchParams(location.search);
const role = params.get("role");   // "landlord" or "tenant"


  const [search, setSearch] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  

  // FILTER LOGIC (DERIVED VIEW)
  const filteredProperties = properties.filter(p => {

    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
const matchesMin = minRent ? p.rent >= Number(minRent) : true;
const matchesMax = maxRent ? p.rent <= Number(maxRent) : true;


    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <div className="home-container">

      <h1>🏠 Rental App</h1>

{role === "landlord" && <AddPropertyForm onAdd={onAdd} />}


      <div style={{ margin: "20px 0" }}>
        <input 
          placeholder="Search by city or title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <input 
          placeholder="Min rent"
          type="number"
          value={minRent}
          onChange={e => setMinRent(e.target.value)}
        />

        <input 
          placeholder="Max rent"
          type="number"
          value={maxRent}
          onChange={e => setMaxRent(e.target.value)}
        />
      </div>

      <PropertyList 
        properties={filteredProperties}
        onToggleFav={onToggleFav}
        onDelete={onDelete}
      />

    </div>
  );
}

