



import { Link } from "react-router-dom";

import {useNavigate} from "react-router-dom";


export default function HomePage({rentRange,setRentRange,search,searchLocation,setSearch,setSearchLocation,propertyType,setPropertyType})     {


const navigate=useNavigate();

function handleSearch(){
  navigate(`/Listing?search=${search}&rentRange=${rentRange}&searchLocation=${searchLocation}&propertyType=${propertyType}`);

setSearch("");
setRentRange("");
setSearchLocation("");
setPropertyType("");

}

const isMissingSearchParams = !search && !rentRange && !searchLocation && !propertyType;

  

  
  return (
    <div className="home-container">
      

   


 <header>
  
  

  

      <img src="https://i.postimg.cc/rm9pFt6R/df6b1cc7-5a8e-45ff-93fb-2ddc329cdfa6-removebg-preview.png"   className="header-logo"></img>
    


 <ul className="nav-links">

<li className="nav-link">

<Link className="Link" to="/">Home</Link>
</li>

<li className="nav-link">

<Link className="Link" to="/favorites">Favorites</Link>
</li>

<li className="nav-link">

<Link className="Link" to="/Listing">All Properties</Link>
</li>

<li className="nav-link" >

<span className="Link" >Messages</span>
</li>

<li className="nav-link" >

<span className="Link">Contact</span>
</li>

</ul>

 <div className="auth-buttons">

<div className="btn-primary">

   <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="action-icon"
  
  >
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>

  <Link to="/Listing" className="nav-item">
  <span>List Property</span>
</Link>

</div>
  
 <div className="notification-btn">

    {/* Bell SVG */}

    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bell-icon"
    >
        <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .738-1.674C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
    </svg>

</div>


<div  className="user-profile">   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> <p>Aman</p></div>

  
  </div>

 

  

  
 
  </header>


<div className="intro-box">


<div class="left">
  <div class="text-content">
    <h1>Find Your Perfect ✦</h1>
    <h1><span class="gradient-text">Rental</span> Home</h1>
    <p>Discover your dream rental property with the help of our advanced AI assistance and filtering options.</p>
  </div>

  <div className="info-box">

<h2>Verified Properties</h2>
<h2>Trusted Landowners</h2>
<h2>Secure&Safe</h2>

</div>


<div className="search-box">




  


  <input
       type="text"
       value={searchLocation}
       onChange={(e)=>setSearchLocation(e.target.value)}
        placeholder="Search by location, locality or state"
      />

      {/* Rent Dropdown */}
      <select
        value={rentRange}
        onChange={(e) => setRentRange(e.target.value)}
      >
        <option>Rent Range</option>
        <option>Below ₹10,000</option>
        <option>₹10,000 - ₹20,000</option>
        <option>₹20,000 - ₹30,000</option>
        <option>₹30,000 - ₹50,000</option>
        <option>Above ₹50,000</option>
      </select>

      {/* Property Type */}
      <select
      
      
      value={propertyType}
      onChange={(e)=>setPropertyType(e.target.value)}
      
      >
        <option>Property Type</option>
        <option>Apartment</option>
        <option>Builder Floor</option>
        <option>Independent House</option>
        <option>Villa</option>
        <option>Studio Apartment</option>
        <option>PG</option>
      </select>

     

      {/* Search Button */}
      <button   disabled={isMissingSearchParams}  onClick={handleSearch} className="search-button">
        
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" fill="none" stroke="#100f0f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        
        
        Search</button>

        



</div>


   <div className="trending-searches">

    <h4>🔥 Trending Searches</h4>

    <div className="tags">

        <button>2 BHK in Gurgaon</button>

        <button>3 BHK in Noida</button>

        <button>Flats in Delhi</button>

       

       

    </div>

</div>

</div>




</div>



<div className="detail-section">


<div className="detail-card1">

  <div className="detail-text">


  <h2>10,000+</h2>

  <p>Active Properties</p>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#26cd23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  </div>

<div className="detail-text">

  


  <h2>5,000+</h2>

  

  <p>Happy customers</p>

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cda823" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smile-icon lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
  
  </div>

  <div className="detail-text">


  <h2>200+</h2>

  <p>Client covered</p>

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080808" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-person-standing-icon lucide-person-standing"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>
  </div>

  <div className="detail-text">


  <h2>4.8/5</h2>

  <p>Customer Ratings</p>

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080808" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
  </div>


  

</div>
<div className="detail-card2">

<div className="left2">

<h2>List Your Property</h2>
<p>Reach thousand of verified tenants quickly</p>

<button type="submit" className="btn-primary2">List Now</button>

</div>
<div className="right2">

  <img src="https://i.postimg.cc/kMxwjzt8/59a861c2b72bfbafcb1dc4f42d0a9ec5-removebg-preview.png" className="hero-image2" />



</div>







</div>


<div className="detail-card3">

<div className="left3">


<h2>AI Price Estimator</h2>

<p>Get Ai powered price suggestions based on market trend</p>

<span type="submit" className="btn-primary3">Estimate Now</span>

</div>



<div className="right3">

  <img src="https://i.postimg.cc/kMxwjzt8/59a861c2b72bfbafcb1dc4f42d0a9ec5-removebg-preview.png" className="hero-image2" />



</div>



</div>


</div>


<div className="main-section">

<div className="property-cards">

<div className="property-card">
<div className="hero-image3">

<img src="https://i.postimg.cc/zG1QY6gc/AURUS-Lounge-gallery-image-1-1024x683.jpg" />
</div>

<div className="card-text">


</div>

</div>

<div className="property-card">

<div className="hero-image3">

<img src="https://i.postimg.cc/zG1QY6gc/AURUS-Lounge-gallery-image-1-1024x683.jpg" />
</div>

<div className="card-text">



</div>

</div>

<div className="property-card">
<div className="hero-image3">

<img src="https://i.postimg.cc/zG1QY6gc/AURUS-Lounge-gallery-image-1-1024x683.jpg" />
</div>

<div className="card-text">


</div>

</div>


<div className="property-card">

  <div className="hero-image3">

<img src="https://i.postimg.cc/zG1QY6gc/AURUS-Lounge-gallery-image-1-1024x683.jpg" />
</div>

<div className="card-text">








</div>



</div>







</div>

   <div className="properties-right">

       

            <div className="quick-actions-card">

    <h3>Quick Actions</h3>

    <div className="quick-actions-grid">

        <div className="action-box">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-icon lucide-scroll"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
            {/* Icon */}
            <p>Shortlist</p>
        </div>

        <div className="action-box">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a0043" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/></svg>
            {/* Icon */}
            <p>Bookings</p>
        </div>

        <div className="action-box">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008a5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library-big-icon lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>
            {/* Icon */}
            <p>Saved </p>
        </div>

        <div className="action-box">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#161817" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-alert-icon lucide-cloud-alert"><path d="M12 12v4"/><path d="M12 20h.01"/><path d="M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642"/></svg>
            {/* Icon */}
            <p>Alerts</p>
        </div>

    

</div>

        </div>

        <div className="side-card">

          <div className="side-context">

<h3>Popular location</h3>

<button type="submit"  className="view-button">View All</button>

          </div>

          <div className="four-cards">

            

<div className="Card">
  <div className="left3">

    <div className="side-image">
<img src="https://i.postimg.cc/qRXy06y9/f5b1b5e005cc6e61cb6b7dfa0a1efd5d.jpg" />


    </div>


  </div>
  <div className="right3">
  <h3>
  
Gurgoan</h3>



<p4>1,200+</p4>

</div>

</div>


<div className="Card">
 <div className="left3">

    <div className="side-image">
<img src="https://i.postimg.cc/qRXy06y9/f5b1b5e005cc6e61cb6b7dfa0a1efd5d.jpg" />


    </div>


  </div>
  <div className="right3">
  <h3>
  
Gurgoan</h3>



<p4>1,200+</p4>

</div>


</div>

<div className="Card">
 <div className="left3">

    <div className="side-image">
<img src="https://i.postimg.cc/qRXy06y9/f5b1b5e005cc6e61cb6b7dfa0a1efd5d.jpg" />


    </div>


  </div>
  <div className="right3">
  <h3>
  
Gurgoan</h3>



<p4>1,200+</p4>

</div>


</div>


<div className="Card">
 <div className="left3">

    <div className="side-image">
<img src="https://i.postimg.cc/qRXy06y9/f5b1b5e005cc6e61cb6b7dfa0a1efd5d.jpg" />


    </div>


  </div>
  <div className="right3">
  <h3>
  
Gurgoan</h3>



<p4>1,200+</p4>

</div>


</div>

          </div>

           

        </div>

    </div>
    





</div>

<div className="property-footer">

    <div className="footer-left">

        <span>⭐ 4.3</span>

        <span>Verified</span>

    </div>

    <div className="footer-right">

        <button>View Details</button>

    </div>

</div>




   




    </div>
  );
}

