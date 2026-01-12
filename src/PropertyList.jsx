


import PropertyCard from "./PropertyCard";

export default function PropertyList({properties,isLandLord,onDelete,onFavorite,filteredProperties,onToggle,visibleCount}){



if (visibleCount===0 && isLandLord){
    return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}>No property added yet</p>}
    if (visibleCount===0 && !isLandLord){
        return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}>No properties available yet.</p>
    }
if(properties.length===0){
    return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}>No  properties match your search.</p>
}
    return(

        <div className="property-list">

    {

        

filteredProperties.map(p=>(

    <PropertyCard key={p.id} property={p} onToggle={onToggle} onDelete={onDelete} onFavorite={onFavorite}/>

    




))
        }

        </div>
        

    );
}