import PropertyList from "../PropertyList";
import {Link} from "react-router-dom";


export default function FavoritePage({
  properties = [],
  onFavorite,

  onDelete,
  isLandlord
  ,onToggle
}) {
if (properties.length === 0) {
  return (
 

      <div className="back-link-box">
        <Link className="Link2" to="/home">
          ← Back to Home
        </Link>
      </div>

      

    
  );
}


  return (
    <div>
      <h1 style={{textAlign:"center"}}>All Listings</h1>
      <div className="link-card ">
      <Link style={{textDecoration:"none",padding:"10px"}} to="/home">Back to home   </Link> </div>
<div style={{margin:"13px"}}>
      <PropertyList
    
      
        properties={properties}
        onFavorite={onFavorite}
        onDelete={onDelete}
        isLandlord={isLandlord}
        onToggle={onToggle}
        
        
    
      
      /></div>
    </div>
  );
}
