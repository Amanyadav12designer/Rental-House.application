
import "./PropertyCard.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";



export default function PropertyCard({
  property=[],
  onToggle,
  onDelete,
  onFavorite,isLandlord,message, updateProperty,editingProperty,setEditingProperty
}) {


function handleEditSubmit(e){

e.preventDefault();

const updatedData={
  rent: editingProperty.rent,

  title: editingProperty.title
};

updateProperty(property.id,updatedData);

}

  return (
    <div className="property-grid">
   
    <div className="property-card">
      <h2>{property.title}</h2>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Location: {property.location}</p>
      <p style={{fontFamily:"playfair",fontSize:"18px"}}> Rent: ₹{property.rent}</p>
      <img src={property.image} alt={property.title} style={{width:"100%",objectFit:"cover",borderRadius:"8px"}}/>

    

      <button style={{width:"130px",marginTop:"20px",border:"1px solid black",borderRadius:"5px",height:"30px",fontFamily:"Graduate",cursor:"pointer"}} onClick={() => onToggle(property.id)}>
        Switch Status
      </button>

      <button  onClick={()=>
      
        onDelete(property.id)
      }  disabled={!isLandlord}
      className="delete-button"

      >Delete
      
        
      </button>




    


         

      <span
        style={{ marginLeft: "1px", cursor: "pointer",paddingTop:"40px" }}
        onClick={() => onFavorite(property.id)}
      >
        {property.favorite ? <MdFavorite color="gold" size={30} /> : <MdFavoriteBorder size={30} />}
      </span>

      {message&&
      <p style={{color:"green",fontFamily:"arial",fontWeight:"bold"}}>{message}</p>
      } 

    

      

      <p style={{textAlign:"right"}}>
        Status:{" "}
        <strong style={{ color: property.available ? "green" : "red" }}>
          {property.available ? "Available" : "Not Available"}
        </strong>
      </p>

      <a href={`tel:${property.contactNumber}`} className="contact-button">
        Call Contact
      </a>

      <br />

      <a href={`https://wa.me/${property.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="contact-button">
         WhatsApp
      </a>


      
      

      
    </div></div>
  );
}

