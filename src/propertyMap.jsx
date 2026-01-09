import {MapContainer,TileLayer,Marker,Popup} from "react0leaf-let";

export default function propertyMap({properties}){
if(properties===0) return null;

return(

    <MapContainer

    center={[properties[0].lat,properties[0].lng]}

    zoom={10}
     style={{height:"300px", width:"100%"}}>

        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />

        {properties.map(p=>(

            <Marker key={p.id}
            position ={[p.lat,p.lng]}>

                <Popup>

                    <strong>{p.title}</strong><br />
                    {p.location}<br />
                    {p.rent}
               </Popup>
</Marker>

        ))}



        


     </MapContainer>
)

}