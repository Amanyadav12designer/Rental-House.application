import {useState} from "react";

export default function AddPropertyForm({onAdd}){

    const [title,setTitle] = useState("");


    const [location,setLocation] = useState("");
    const [rent,setRent] = useState("");
    const [image,setImage] = useState("");


const isFormValid= !title || !location || !rent || !image;



    function handleSubmit(e){
        e.preventDefault();
        if(!title || !location || !rent || !image){
            alert("Please fill in all fields");
            return;
        }

        

        const newProperty = {
            id: Date.now(),
            title,
            location,
            rent,image,
            favorite: false
            


        }
        onAdd(newProperty);


        setTitle("");
        setLocation("");
        setRent("");
        setImage("");
           
    }


    return(
    <form onSubmit={handleSubmit} style={{marginTop:"30px"}}>
    
      <input style={{marginLeft:"3px"}} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input style={{marginLeft:"9px"}} value={location} onChange={e=>setLocation(e.target.value)} placeholder="eg Delhi" />
      <input style={{marginLeft:"9px"}} value={rent} onChange={e=>setRent(e.target.value)} placeholder="Rent" />
      <input style={{marginLeft:"9px"}} value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" />

      <button type="submit" disabled={isFormValid} style={{marginLeft:"10px",width:"100px",border:"1px solid grey",borderRadius:"5px",height:"35px",cursor:"pointer",fontFamily:"Playfair",width:"100px",fontWeight:"bold",color:"white",background:"black"}}>Add Property</button> 
    </form>
    




);

}



