import {useState,useEffect} from "react";

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



  let filteredProperties=properties;

  if(search){
    filteredProperties=filteredProperties.filter(p=>

      p.title.toLowerCase().includes(search.toLowerCase())
    );
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


  function addProperty(newProperty){
    setProperties([...properties,newProperty]);
  }

    function toggleAvailability(id){
      setProperties(properties.map(p=>

        p.id===id?{...p,available:!p.available}:p

      )

    

      )
    };
    


    function deleteProperty(id){
      setProperties(properties.filter(p=>p.id!==id));
    }
    

return(

  
<div style={{padding:"20px",marginBottom:"20px", fontFamily:"arial"}}>

  <h1>Rental Housing Application</h1>

  <strong>Total Properties : {properties.length} </strong>
  <strong style={{marginLeft:"20px"}}>Properties Available: {properties.filter(p=>p.available).length}</strong>


<AddPropertyForm onAdd={addProperty}/> 
<PropertyList properties={filteredProperties} onToggle={toggleAvailability} onDelete={deleteProperty}/>


<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by Title" style={{marginTop:"20px"}}/>
<input value={minRent} onChange={e=>setMinRent(e.target.value)} placeholder="Min Rent" style={{marginLeft:"10px"}}/>
<input value={maxRent} onChange={e=>setMaxRent(e.target.value)} placeholder="Max Rent" style={{marginLeft:"10px"}}/>

    <input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder="Search by Location" style={{marginLeft:"10px"}}/>

    





    


</div>

);



}




