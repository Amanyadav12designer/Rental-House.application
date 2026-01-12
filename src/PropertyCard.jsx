
import "./PropertyCard.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";



export default function PropertyCard({
  property,
  onToggle,
  onDelete,
  onFavorite
}) {
  return (
    <div className="property-card">
      <h3 style={{fontFamily:"Graduate",fontSize:"23px"}}>{property.title}</h3>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Location: {property.location}</p>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Rent: ₹{property.rent}</p>
      <img src={property.image} alt={property.title} style={{width:"100%",objectFit:"cover",borderRadius:"8px"}}/>

    

      <button style={{width:"130px",marginTop:"20px",border:"1px solid black",borderRadius:"5px",height:"30px",fontFamily:"Graduate",cursor:"pointer"}} onClick={() => onToggle(property.id)}>
        Switch Status
      </button>

      <button
        onClick={() => onDelete(property.id)}
        style={{ marginLeft: "1px", color: "red",marginTop:"30px",width:"130px",border:"1px solid black",borderRadius:"5px",height:"30px" ,fontFamily:"Graduate",cursor:"pointer"}}
      >
        Delete
      </button>

         

      <span
        style={{ marginLeft: "1px", cursor: "pointer",paddingTop:"40px" }}
        onClick={() => onFavorite(property.id)}
      >
        {property.favorite ? <MdFavorite color="gold" size={30} /> : <MdFavoriteBorder size={30} />}
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

