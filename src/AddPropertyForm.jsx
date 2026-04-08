import {useState} from "react";

import {MdHome} from "react-icons/md";
import { MdLocationOn } from "react-icons/md";


import { MdAttachMoney } from "react-icons/md";
import { MdImage } from "react-icons/md";
import{MdPhone} from "react-icons/md";



export default function AddPropertyForm({onAdd,onRestore}){

    const [title,setTitle] = useState("");
    const [location,setLocation] = useState("");
    const [contactNumber,setContactNumber] = useState("");
    const [whatsappNumber,setWhatsappNumber] = useState("");


    const [rent,setRent] = useState("");
    const [image,setImage] = useState("");


const isFormValid= !title || !location || !rent || !image || !contactNumber || !whatsappNumber;



    function handleSubmit(e){
        e.preventDefault();
        if(!title || !location || !rent || !image){
            alert("Please fill in all fields");
            return;
        }

        

        const newProperty = {
          
            title,
            location,
            rent:Number(rent),image,contactNumber,whatsappNumber,
          
            


        }
        onAdd(newProperty);


        setTitle("");
        setLocation("");
        setRent("");
        setImage("");
        setContactNumber("");
        setWhatsappNumber("");
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
        <input  value={rent} onChange={e=>setRent(e.target.value)} placeholder="Rent" />
      </div>

      <div className="input-wrapper">
        <MdImage className="input-icon"  style={{marginTop:"5px"}} />
        <input  value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" style={{marginTop:"10px"}}  />
      </div>

        <div className="input-wrapper">
            <MdPhone className="input-icon" />
            <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} />
        </div>
        <div className="input-wrapper">
            <MdPhone className="input-icon" style={{marginTop:"5px"}} />
            <input type="text" placeholder="WhatsApp Number" value={whatsappNumber} onChange={e=>setWhatsappNumber(e.target.value)} style={{marginTop:"10px"}} />
        </div>
      


      <button type="submit" disabled={isFormValid} style={{marginTop:"10px",width:"100px",border:"1px solid grey",borderRadius:"5px",height:"35px",cursor:"pointer",fontFamily:"Playfair",width:"100px",fontWeight:"bold",color:"white",background:"black"}}>Add Property</button> 
    </form>
    




);

}



