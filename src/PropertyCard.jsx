
import "./PropertyCard.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";



export default function PropertyCard({
  property={},
  onToggle,
  onDelete,
  onFavorite,isLandlord,message={}
}) {

  if (!property.id) return null;





  return (
    <div className="property-grid">
   
    <div className="property-card">
      <h2>{property.title}</h2>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Location: {property.location}</p>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Price: ₹{property.price}</p>
      {property.image.includes("video")?(
        <video
        src={property.image}
        controls
        playsInline

        type="video/mp4"
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      ):(
      <img
        src={property.image}
        alt={property.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        
        />

      )}

    <div className="action-buttons">

      <button className="switch-button" onClick={() => onToggle(property.id)}>
        Switch Status
      </button>

      <button  onClick={()=>
      
        onDelete(property.id)
      }  
      className="delete-button"

      >Delete
      
      
        
      </button>
        </div>

      
      





    


         

      <span
        className="favorite-btn"
        onClick={() => onFavorite(property.id)}
      >
        {property.favorite ? <MdFavorite color="gold" size={30} /> : <MdFavoriteBorder size={30} />}
      </span>

      {message?.id === property.id && (
        <p style={{color:"green",fontFamily:"arial",fontWeight:"bold"}}>{message.text}</p>
      )} 
    
    


      

      <p style={{textAlign:"right"}}>
        Status:{" "}
        <strong style={{fontWeight:"bold", color: property.available ? "Black" : "grey" }}>
          {property.available ? "Available" : "Not Available"}
        </strong>
      </p>
     

      <a href={`tel:${property.contactNumber}`} className="contact-button">
        Call Contact
      </a>

      <br /> <br /> <br /> 

      <a href={`https://wa.me/${property.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="contact-button">
         WhatsApp
      </a>
      


      
      

      
    </div></div>
  );
}

