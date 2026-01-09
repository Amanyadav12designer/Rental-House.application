


import PropertyCard from "./PropertyCard";

export default function PropertyList({properties,onToggle,onDelete,onFavorite}){



if (properties.length===0){
    return <p style={{margin:"40px auto",fontFamily:"arial",color:"grey",paddingLeft:"10px"}}>Sorry, No properties available at the moment</p>}
    

    return(

        <div className="property-list">

    {

        

properties.map(p=>(

    <PropertyCard key={p.id} property={p} onToggle={onToggle} onDelete={onDelete} onFavorite={onFavorite}/>

    




))
        }

        </div>
        

    );
}