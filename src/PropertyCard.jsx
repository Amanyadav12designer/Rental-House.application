
import "./PropertyCard.css";


export default function PropertyCard({
  property,
  onToggle,
  onDelete,
  onFavorite
}) {
  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <p>Location: {property.location}</p>
      <p>Rent: ₹{property.rent}</p>
      <img src={property.image} alt={property.title} style={{width:"100%",objectFit:"cover",borderRadius:"8px"}}/>

    

      <button style={{width:"130px",marginTop:"20px",border:"1px solid black",borderRadius:"5px",height:"30px"}} onClick={() => onToggle(property.id)}>
        Toggle Availability
      </button>

      <button
        onClick={() => onDelete(property.id)}
        style={{ marginLeft: "1px", color: "red",marginTop:"30px",width:"130px",border:"1px solid black",borderRadius:"5px",height:"30px" }}
      >
        Delete
      </button>

      

      <span
        style={{ marginLeft: "1px", cursor: "pointer",paddingTop:"40px" }}
        onClick={() => onFavorite(property.id)}
      >
        {property.favorite ? "★ Favorite" : "☆ Mark as Favorite"}
      </span>

      

      <p style={{textAlign:"right"}}>
        Status:{" "}
        <strong style={{ color: property.available ? "green" : "red" }}>
          {property.available ? "Available" : "Not Available"}
        </strong>
      </p>

      
    </div>
  );
}

