import {useState,useEffect} from "react";

import { Routes, Route,useNavigate } from "react-router-dom";

import RolePage from "./pages/RolePage";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {Navigate} from "react-router-dom";




import "./App.css";







export default function App(){
  const [properties,setProperties]= useState([]);

  const[search,setSearch]= useState("");
  const[minRent,setMinRent]= useState("");
  const[maxRent,setMaxRent]= useState("");
  const[searchLocation,setSearchLocation]= useState("");
  const[filter,setFilter]= useState("all");
  const navigate= useNavigate();
  const token= localStorage.getItem("token");
 

  

const[feedbackMessage,setFeedbackMessage]= useState("");
const[role,setRole]=useState(null);



const isLandlord=  role==="landlord";












const visibleCount=properties.length;
async function addProperty(newProperty) {

  const token= localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,Authorization:`Bearer ${token}`,},
      body: JSON.stringify(newProperty),
    });

    if (!res.ok) {
      throw new Error("Failed to add property");
    }

    // ✅ Get saved property from backend


    // ✅ Add correct property (with _id)
    loadProperties();

    alert("Property added successfully ✅");

  } catch (error) {
    console.log(error.message);
    alert("Error adding property ❌");
  }

}

  async function loadProperties(){

    const res= await fetch("http://localhost:5000/api/properties");

    const data= await res.json();

    setProperties(data);
   

  }

  useEffect(()=>{
    loadProperties();
  },[]);



function handleLogin(userRole){
setRole(userRole);
navigate("/home")

}

function handleLogout(){
  localStorage.removeItem("role");

  localStorage.removeItem("token");
  navigate("/login");


}








  let filteredProperties=properties;
  const favoriteProperties= filteredProperties.filter(p=>p.favorite===true);

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
    


   async function deleteProperty(id){

      const token= localStorage.getItem("token");

    if (!isLandlord){
      alert("only landlord can delete property");
      return;
    }

    const confirmDelete=window.confirm("are you sure u want to delete property");
    if(!confirmDelete)return;


    try{

      const res= await fetch(`http://localhost:5000/api/properties/${id}`,{
        method:"DELETE",
        headers:{Authorization:`Bearer${token}`,},
      });

      if(!res.ok){
        throw new Error("Delete failed");

      }
      
        setProperties(properties.filter(p=>p.id!==id));

        alert("deleted successfully")
    }

    catch(error){
      console.log(error);
      alert("something went wrong");
    }


  }
    
   async function toggleFavorite(id){
      try{
        const res= await fetch(`http://localhost:5000/api/properties/${id}/favorite`,{
          method:"PATCH"
        });

        if(!res.ok){
          throw new Error("could not added")
        }
          
       setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, favorite: !p.favorite } : p
      )
    );

      setFeedbackMessage(   "Added to favorites!" );

      setTimeout(()=>{
        setFeedbackMessage("")
      },3000);
  
    }

         catch(error){
      console.log(error);
      alert("something went wrong");
    }

      }
 
  


     
      
    
 




      

return(
  

  <div>

  
    <Routes>
      {!token ?(<>

    <Route path="/" element={<Navigate to="/signup" />}/>
      <Route path="/signup" element={<SignupPage setRole={setRole}/>}/>
      <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/> </>):(<>

      {/* Main Home */}
      <Route
        path="/home"
        element={
          <HomePage
            properties={filteredProperties}
            onAdd={addProperty}
            onFavorite={toggleFavorite}
            onDelete={deleteProperty}
            isLandlord={isLandlord}
            onToggle={toggleAvailability}
               message={feedbackMessage}
             
               role={role}

               onLogout={handleLogout}
               
           
      visibleCount={properties.length}
      filter={filter}
      filteredProperties={filteredProperties}
      search={search}
      setSearch={setSearch}
      minRent={minRent}
      setMinRent={setMinRent}

      maxRent={maxRent}
      setMaxRent={setMaxRent}
      searchLocation={searchLocation}
      setSeachLocation={setSearchLocation}
          />
        }
      />

      {/* Favorites */}
      <Route
        path="/favorites"
        element={ token?
          <FavoritePage
            properties={properties.filter(p => p.favorite)}
            onFavorite={toggleFavorite}
            onDelete={deleteProperty}
          />:<Navigate to="/login" />
        }
      /> </> )}


    </Routes>
      


  




    





    


</div>


);}  








