import PropertyList from "../PropertyList";
import {Link} from "react-router-dom";

export default function FavoritePage({
  properties,
  onFavorite,
  onDelete,
  isLandlord
}) {
if (properties.length === 0) {
  return (
    <div className="empty-favorites">

      <div className="back-link-box">
        <Link className="Link2" to="/home">
          ← Back to Home
        </Link>
      </div>

      <h2 className="empty-text">
        No favorites added yet ❤️
      </h2>

    </div>
  );
}


  return (
    <div>
      <h1 style={{textAlign:"center"}}>Favorite Properties</h1>
      <div className="link-card ">
      <Link className="Link2" to="/home">Back to home   </Link> </div>
<div style={{margin:"13px"}}>
      <PropertyList
        properties={properties}
        onFavorite={onFavorite}
        onDelete={onDelete}
        isLandlord={isLandlord}
      /></div>
    </div>
  );
}
