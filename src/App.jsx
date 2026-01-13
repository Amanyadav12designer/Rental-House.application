import {useState,useEffect} from "react";
import {MdLogin} from "react-icons/md";



import "./App.css";






import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";

export default function App(){
  const [properties,setProperties]= useState(()=>{
return JSON.parse(localStorage.getItem("properties")) || [];

  });
const [selectedProperty,setSelectedProperty]= useState(null);
  const[search,setSearch]= useState("");
  const[minRent,setMinRent]= useState("");
  const[maxRent,setMaxRent]= useState("");
  const[searchLocation,setSearchLocation]= useState("");
  const[filter,setFilter]= useState("all");
const[landlordLoggedIn,setLandlordLoggedin]= useState(false);
const[feedbackMessage,setFeedbackMessage]= useState("");

const visibleCount=properties.length;
async function getCoordinates(location){
  const res= await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
const data = await res.json();
 if(data.length===0)return null;

 return{
lat: parseFloat(data[0].lat),
lng : parseFloat(data[0].lng)

 };

}


async function addProperty(rawProperty){

  const coords= await getCoordinates(rawProperty.location);

  if(!coords){
    alert("location not found");
    return;
  }

  const newProperty={
    ...rawProperty,...coords
  }

  setProperties(prev => [...prev, newProperty]);
}





function loginLandlord(){
  setLandlordLoggedin(true);

}

function logoutLandlord(){
  setLandlordLoggedin(false);
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
    p.location.toLowerCase().includes(searchLocation.toLowerCase())
  );
}

useEffect(()=>{
  localStorage.setItem("properties", JSON.stringify(properties));

},[properties]

);

 filteredProperties=filteredProperties.filter(p=>{

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
if(!landlordLoggedIn) return;

const confirmDelete= window.confirm("Are you sure you want to delete this property?");
if(!confirmDelete) return;


      setProperties(properties.filter(p=>p.id!==id));
    }
    
    function toggleFavorite(id){


     
      
      
      setProperties(properties.map(p=>
        p.id===id?{...p,favorite:!p.favorite}:p
      ));

      setFeedbackMessage(   "Added to favorites!" );

      setTimeout(()=>{
        setFeedbackMessage("");
      },1000);



    }



      

return(
  

  <div className="app-container">

    <header>

      <img src="https://i.postimg.cc/wTjNvdqQ/Screenshot-2026-01-13-002320-removebg-preview.png"  style={{width:"200px",height:"auto"}}></img>
    

  <img src="https://i.postimg.cc/MTgGcwPD/Screenshot-2026-01-13-153032.png" alt="Header Image" className="header-img"/>
  <div className="header-badge">FInd Your stay!
  </div>
  </header>

  <strong>Total Properties : {properties.length} </strong>
  <strong style={{marginLeft:"20px"}}>Properties Available: {properties.filter(p=>p.available).length}</strong>
<span style={{marginLeft:"20px",cursor:"pointer",fontFamily:"Playfair",fontSize:"16px",fontWeight:"bold"}} onClick={()=>setFilter("favorite")}>  Favorites</span>
<span style={{marginLeft:"20px",cursor:"pointer",fontFamily:"Playfair",fontSize:"16px",fontWeight:"bold"}} onClick={()=>setFilter("all")}> Show All</span>

<button    onClick={()=>setLandlordLoggedin(true)} style={{marginLeft:"20px",width:"200px",border:"1px solid black",borderRadius:"5px",height:"30px",cursor:"pointer",fontFamily:"Graduate" ,fontSize:"12px",padding: "0px 20px",fontWeight:"bold"}}>  Login as landlord </button>
<button onClick={()=>setLandlordLoggedin(false)} style={{marginLeft:"10px",width:"100px",border:"1px solid black",borderRadius:"5px",height:"30px",cursor:"pointer",fontFamily:"Graduate",fontSize:"12px",fontWeight:"bold"}}>Logout</button>

{landlordLoggedIn && (
<AddPropertyForm onAdd={addProperty}  /> )} 
<PropertyList properties={filteredProperties}   onToggle={toggleAvailability} onDelete={deleteProperty} onFavorite={toggleFavorite} filteredProperties={filteredProperties} isLandlord={landlordLoggedIn} visibleCount={properties.length} Message={feedbackMessage} />
{selectedProperty&&(
  <PropertyMap properties={selectedProperty}/>
  
)}


  


<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by Title" style={{marginTop:"20px",marginLeft:"10px"}}/>
<input value={minRent} onChange={e=>setMinRent(e.target.value)} placeholder="Min Rent" style={{marginLeft:"10px"}}/>
<input value={maxRent} onChange={e=>setMaxRent(e.target.value)} placeholder="Max Rent" style={{marginLeft:"10px"}}/>

    <input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder="Search by Location" style={{marginLeft:"10px"}}/>

    





    


</div>


);}








