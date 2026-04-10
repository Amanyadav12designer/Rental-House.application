
import AddPropertyForm from "../AddPropertyForm";
import PropertyList from "../PropertyList";
import {MdHome} from "react-icons/md";
import {MdBookmark} from "react-icons/md";
import { MdInfo} from "react-icons/md";
import { MdLogout } from "react-icons/md";

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
  
  

  

      <img src="https://i.postimg.cc/wTjNvdqQ/Screenshot-2026-01-13-002320-removebg-preview.png"   className="header-logo"></img>
    

 <ul class="nav-links">
        
       <div className="nav-link"> <MdHome className="nav-icon" size={30} /> <li> <Link className="Link" style={{ textDecoration: 'none' }} to="/">HOME</Link></li></div>|
     <div className="nav-link"> <MdBookmark className="nav-icon" size={30} style={{ marginLeft: '63px' }} /> <li><Link className="Link"  to="/favorites">FAVORITE PROPERTIES</Link></li></div>|
        <div className="nav-link"> <MdInfo className="nav-icon" size={30} style={{ marginLeft: '7px' }} /> <li><Link className="Link" style={{ textDecoration: 'none' }} to="/brief">BRIEF</Link></li></div>|
        
       <div className="nav-link"> <MdLogout className="nav-icon" size={30} style={{ marginLeft: '18x' }} /> <li><span className="Link" style={{ textDecoration: 'none', color: 'black' }} onClick={onLogout}>LOG-OUT</span></li></div>

        
        
       
        
      </ul>

 

  

  
 
  </header>


      {isLandlord && <AddPropertyForm onAdd={onAdd}  />}

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
        setSearchLocation={setSearchLocation}
   
      setMinRent={setMinRent}
      setMaxRent={setMaxRent}
      setSearch={setSearch}
      
        
       
     
        
      />

   


<input value={search} className="filters" onChange={e=>setSearch(e.target.value)} placeholder="Search by Title" />
<input value={minRent} className="filters" onChange={e=>setMinRent(e.target.value)} placeholder="Min Rent" />
<input value={maxRent} className="filters" onChange={e=>setMaxRent(e.target.value)} placeholder="Max Rent" />

    <input  value={searchLocation} className="filters" onChange={e=>setSearchLocation(e.target.value)} placeholder="Search by Location" />


    </div>
  );
}

