
import AddPropertyForm from "../AddPropertyForm";
import PropertyList from "../PropertyList";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomePage({ properties, onAdd, onFavorite, onDelete,isLandlord ,onToggle, message,
  visibleCount,onLogout,
  filter,
  filteredProperties,search,minRent,maxRent,searchLocation,setSearch,setMinRent,setMaxRent,setSearchLocation,successFeedback,deletedMessage}) {
  const location = useLocation();



  
  return (
    <div className="home-container">
      {successFeedback && <div className="success-message">{successFeedback}</div>}

      {deletedMessage && <div className="deleted-message">{deletedMessage}</div>}

      


 <header>

      <img src="https://i.postimg.cc/wTjNvdqQ/Screenshot-2026-01-13-002320-removebg-preview.png"  style={{width:"200px",height:"auto"}}></img>
    

  <img src="https://i.postimg.cc/MTgGcwPD/Screenshot-2026-01-13-153032.png" alt="Header Image" className="header-img"/>
  <div className="header-badge">FInd Your stay!
  </div>

  
 
  </header>
  <div className="stats-bar">
  
   <strong>Total Properties : {properties.length} </strong>
  <strong style={{marginLeft:"20px"}}>Properties Available: {properties.filter(p=>p.available).length}</strong>




<div className="link-card">

<Link className="Link" to="/favorites"> Favorites</Link></div>
<button className="logout-button" onClick={onLogout}>LOG-OUT</button></div>

      {isLandlord && <AddPropertyForm onAdd={onAdd} />}

      <PropertyList
        properties={properties}
        onFavorite={onFavorite}
        onDelete={onDelete}
        isLandlord={isLandlord}
        onToggle={onToggle}
        message={message}
    filteredProperties={filteredProperties}
        filter={filter}
        visibleCount={visibleCount}
        search={search}
        minRent={minRent}
        maxRent={maxRent}
        searchLocation={searchLocation}
     
        
      />

   


<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by Title" style={{marginTop:"20px",marginLeft:"10px"}}/>
<input value={minRent} onChange={e=>setMinRent(e.target.value)} placeholder="Min Rent" style={{marginLeft:"10px"}}/>
<input value={maxRent} onChange={e=>setMaxRent(e.target.value)} placeholder="Max Rent" style={{marginLeft:"10px"}}/>

    <input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder="Search by Location" style={{marginLeft:"10px"}}/>


    </div>
  );
}

