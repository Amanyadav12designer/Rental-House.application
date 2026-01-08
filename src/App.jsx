import {useState,useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import PropertyMap from "./PropertyMap";



import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";


export default function App(){
  const [properties,setProperties]= useState(()=>{
return JSON.parse(localStorage.getItem("properties")) || [];

  });

  const[search,setSearch]= useState("");
  const[minRent,setMinRent]= useState("");
  const[maxRent,setMaxRent]= useState("");
  const[searchLocation,setSearchLocation]= useState("");
  const[filter,setFilter]= useState("all");
const[LandlordLoggedIn,setLandlordLoggedIn]= useState(false);


async function getCoordinates(location){
const res= await  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json
`);

const data = await res.json();

if(data.length===0) return null;
return{
  lat:parseFloat(data[0].Lat),
  lon:parseFloat(data[0].Lon)
};



}

async function addProperty(rawProperty){
const coords= await getCoordinates(rawProperty.location);
if(!coords){
  alert("Invalid location");
  return;
}

const newProperty={
  ...rawProperty,coordinates:coords
};

setProperties([...properties,newProperty]);
}


function loginLandlord(){
  setLandlordLoggedIn(true);

}

function logoutLandlord(){
  setLandlordLoggedIn(false);
}


  let filteredProperties=properties;

  if(search){
    filteredProperties=filteredProperties.filter(p=>

      p.title.toLowerCase().includes(search.toLowerCase()) 
    ) 
  }
 

  if(minRent){
    filteredProperties=filteredProperties.filter(p=>
      p.rent >=Number(minRent)
    );
  }

if(maxRent){
  filteredProperties=filteredProperties.filter(p=>
    p.rent <=Number(maxRent)
  );
}


if(searchLocation){
  filteredProperties=filteredProperties.filter(p=>
    p.title.toLowerCase().includes(searchLocation.toLowerCase())
  );
}

useEffect(()=>{
  localStorage.setItem("properties", JSON.stringify(properties));

},[properties]

);

 filteredProperties=properties.filter(p=>{

  if(filter==="favorite") return p.favorite;
  return true;
});



  

    function toggleAvailability(id){
      setProperties(properties.map(p=>

        p.id===id?{...p,available:!p.available}:p

      )

    

      )
    };
    


    function deleteProperty(id){
      setProperties(properties.filter(p=>p.id!==id));
    }
    
    function toggleFavorite(id){
      setProperties(properties.map(p=>
        p.id===id?{...p,favorite:!p.favorite}:p
      ));
    }



      

return(

  
<div style={{padding:"20px",marginBottom:"20px", fontFamily:"arial"}}>

  <h1>Rental Housing Application</h1>

  <strong>Total Properties : {properties.length} </strong>
  <strong style={{marginLeft:"20px"}}>Properties Available: {properties.filter(p=>p.available).length}</strong>
<span style={{marginLeft:"20px",cursor:"pointer"}} onClick={()=>setFilter("favorite")}>  Favorites</span>
<span style={{marginLeft:"20px",cursor:"pointer"}} onClick={()=>setFilter("all")}> Show All</span>

<button onClick={()=>setLandlordLoggedIn(true)} style={{marginLeft:"20px"}}>Login as Landlord</button>
<button onClick={()=>setLandlordLoggedIn(false)} style={{marginLeft:"10px"}}>Logout</button>

{LandlordLoggedIn && (
<AddPropertyForm onAdd={addProperty}/> )}
<PropertyList properties={filteredProperties} onToggle={toggleAvailability} onDelete={deleteProperty} onFavorite={toggleFavorite}/>

  <PropertyMap properties={filteredProperties} />
  


<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by Title" style={{marginTop:"20px"}}/>
<input value={minRent} onChange={e=>setMinRent(e.target.value)} placeholder="Min Rent" style={{marginLeft:"10px"}}/>
<input value={maxRent} onChange={e=>setMaxRent(e.target.value)} placeholder="Max Rent" style={{marginLeft:"10px"}}/>

    <input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder="Search by Location" style={{marginLeft:"10px"}}/>

    





    


</div>

);}








