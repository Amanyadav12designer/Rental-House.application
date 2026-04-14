import {useState} from "react";

import {MdHome} from "react-icons/md";
import { MdLocationOn } from "react-icons/md";


import { MdAttachMoney } from "react-icons/md";
import { MdImage } from "react-icons/md";
import{MdPhone} from "react-icons/md";
import{MapContainer,TileLayer,Marker,useMapEvents} from "react-leaflet";



export default function AddPropertyForm({onAdd,onRestore}){

    const [title,setTitle] = useState("");
    const [location,setLocation] = useState("");
    const [contactNumber,setContactNumber] = useState("");
    const [whatsappNumber,setWhatsappNumber] = useState("");
    const [lat,setLat] = useState("");
    const [lng,setLng] = useState("");
    



    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");
    const [imageFile,setImageFile] = useState(null);



const isFormValid= !title || !location || !price || !imageFile || !contactNumber || !whatsappNumber;



    async function handleSubmit(e){
        e.preventDefault();
        if(!title || !location || !price || !imageFile || !contactNumber || !whatsappNumber){
            alert("Please fill in all fields");
            return;
        }

try{
    const formData = new FormData();
        formData.append("file",imageFile);
formData.append("upload_preset","rental-housing-app");

const res = await
fetch( "https://api.cloudinary.com/v1_1/dgyohc9qx/auto/upload",{

    method:"POST",
    body:formData,
});

const data = await res.json();
const imageUrl = data.secure_url;
        

        

        const newProperty = {
          
            title,
            location,
            price:Number(price),image: imageUrl,contactNumber,whatsappNumber,lat:Number(lat),lng:Number(lng)
          
            


        }






        onAdd(newProperty);


        setTitle("");
        setLocation("");
        setPrice("");
        setImageFile(null);
        setContactNumber("");
        setWhatsappNumber("");
        setLat("");
        setLng("");
    }

    catch(err){
        alert("Error adding property");
        console.log(err);
    }
    }
    function LocationPicker(){
        useMapEvents({

           async click(e){
                setLat(e.latlng.lat);
                setLng(e.latlng.lng);

const res = await fetch( `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
const data = await res.json();
setLocation(data.display_name);

            },
        })
        return null;
    }


    return(
    <form onSubmit={handleSubmit} style={{marginTop:"30px"}}>

        <div className="input-wrapper">
        <MdHome className="input-icon"/>
    
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder=    "Property Details" /></div>

      <div className="input-wrapper">
      <MdLocationOn className="input-icon" />
      <input  value={location} onChange={e=>setLocation(e.target.value)} placeholder="Type location" /></div>

      <div className="input-wrapper">
        <MdAttachMoney className="input-icon" />
        <input  value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" />
      </div>

      <div className="input-wrapper">
        <MdImage className="input-icon"  style={{marginTop:"5px"}} />
        <input  onChange={e=>setImageFile(e.target.files[0])} type="file" placeholder="Upload Image/Video" style={{marginTop:"10px"}} accept="image/*,video/*" />
      </div>

        <div className="input-wrapper">
            <MdPhone className="input-icon" />
            <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} />
        </div>
        <div className="input-wrapper">
            <MdPhone className="input-icon" style={{marginTop:"5px"}} />
            <input type="text" placeholder="WhatsApp Number" value={whatsappNumber} onChange={e=>setWhatsappNumber(e.target.value)} style={{marginTop:"10px"}} />
        </div>

        <div style={{marginTop:"20px"}}>
            <p style={{marginBottom:"10px"}}>Click on the map to select property location:</p>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{height:"300px"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker />
                {lat && lng && <Marker position={[lat, lng]} />}
            </MapContainer>
        </div>
      


      <button type="submit" disabled={isFormValid} style={{marginTop:"10px",width:"100px",border:"1px solid grey",borderRadius:"5px",height:"35px",cursor:"pointer",fontFamily:"Playfair",width:"100px",fontWeight:"bold",color:"white",background:"black"}}>Add Property</button> 
    </form>
    




);

}



