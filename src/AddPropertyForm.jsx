import {useState} from "react";

export default function AddPropertyForm({onAdd}){

    const [title,setTitle] = useState("");


    const [location,setLocation] = useState("");
    const [rent,setRent] = useState("");
    const [image,setImage] = useState("");



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
            rent,image
        }
        onAdd(newProperty);


        setTitle("");
        setLocation("");
        setRent("");
        setImage("");
           
    }


    return(
    <form onSubmit={handleSubmit}>
    
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" />
      <input value={rent} onChange={e=>setRent(e.target.value)} placeholder="Rent" />
      <input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL" />

      <button type="submit" style={{marginLeft:"10px"}}>Add Property</button> 
    </form>
    




);

}



