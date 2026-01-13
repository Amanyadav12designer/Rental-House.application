
import {FaExclamationCircle} from "react-icons/fa";

import{FaTimesCircle} from "react-icons/fa";

import { FaExclamationTriangle } from "react-icons/fa";


import PropertyCard from "./PropertyCard";

export default function PropertyList({properties,isLandlord,onDelete,onFavorite,filteredProperties,onToggle,visibleCount,Message}){



if (visibleCount===0 && isLandlord){
    return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}><FaExclamationTriangle   size={20} style={{marginRight:"5px"}}/>No property added yet</p>}
    if (visibleCount===0 && !isLandlord){
        return <p style={{margin:"30px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px",paddingTop:"20px"}}>  <FaExclamationCircle   size={20} style={{marginRight:"5px"}}/> No properties available yet.</p>
    }
if(properties.length===0){
    return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}>  <FaTimesCircle   size={20} style={{marginRight:"5px"}}/>   No  properties match your search.</p>
}
    return(

        <div className="property-list">

    {

        

filteredProperties.map(p=>(

    <PropertyCard key={p.id} property={p} onToggle={onToggle} onDelete={onDelete} onFavorite={onFavorite} isLandlord={isLandlord} message={Message}/>

    




))
        }

        </div>
        

    );
}