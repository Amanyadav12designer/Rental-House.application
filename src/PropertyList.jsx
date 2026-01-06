


import PropertyCard from "./PropertyCard";

export default function PropertyList({properties,onToggle,onDelete}){


if (properties.length===0){
    return <p>No properties available</p>}
    

    return(

        <div style={{ margin:"40px auto",fontFamily:"arial"}}>

    

        { 

properties.map(p=>(

    <PropertyCard key={p.id} property={p} onToggle={onToggle} onDelete={onDelete}/>

    




))
        }

        </div>
        

    );
}