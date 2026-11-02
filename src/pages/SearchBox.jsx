function SearchBox(){


return(


<div className="search-box">

  <input
        type="text"
        placeholder="Search by location, locality or state"
      />

      {/* Rent Dropdown */}
      <select>
        <option>Rent Range</option>
        <option>Below ₹10,000</option>
        <option>₹10,000 - ₹20,000</option>
        <option>₹20,000 - ₹30,000</option>
        <option>₹30,000 - ₹50,000</option>
        <option>Above ₹50,000</option>
      </select>

      {/* Property Type */}
      <select>
        <option>Property Type</option>
        <option>Apartment</option>
        <option>Builder Floor</option>
        <option>Independent House</option>
        <option>Villa</option>
        <option>Studio Apartment</option>
        <option>PG</option>
      </select>

      {/* Filter Dropdown */}
      <select>

        
        <option>Filters</option>
        <option>Furnished</option>
        <option>Semi-Furnished</option>
        <option>Unfurnished</option>
        <option>Parking Available</option>
        <option>Pet Friendly</option>
        <option>Family</option>
        <option>Bachelor</option>


      </select>

      {/* Search Button */}
      <button>
        
        
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#100f0f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
        
        
        Search</button>



</div>

)





}

export default SearchBox;