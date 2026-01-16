import PropertyCard  from "../PropertyCard.jsx";

export default function FavoritePage({properties}){

    const favoriteProps=properties.filter(p=>
        p.favorite
    );


    if(favoriteProps.length===0){
        return  <div> <h1>NO favorite added yet</h1>
        <p>Click yellow button to update favorite list </p></div>
    };

return(

    <div>
        <h1>Favorite properties</h1>

        {favoriteProps.map(p=>(
            <PropertyCard key={p.id} property={p}
            
             onToggle={() => {p.id}}
  onDelete={() => {p.id}}
  onFavorite={() => {p.id}}
  isLandlord={false}/>
        ))}



    </div>
);



}