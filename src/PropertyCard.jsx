export default function PropertyCard({property,onToggle,onDelete}){

return(

    <div style={{
        border:"1px solid grey",padding:"10px", marginBottom:"10px",borderRadius:"8px"
    }}>

<h3>{property.title}</h3>
<p>Location: {property.location}</p>
<p>Rent: ${property.rent}</p>
<img src={property.image} width="200px" style={{borderRadius:"8px"}}/>


<p>Status:{""}<strong style={{color: property.available ? "green" : "red"}}> {property.available?"Available":"Not Available"}</strong></p>
<button onClick={()=>onToggle(property.id)}>Toggle Availability</button>
<button onClick={()=>onDelete(property.id)}style={{marginLeft:"10px",color:"red"}}
>Delete Property</button>

</div>

);

}