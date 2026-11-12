
import { useState } from "react";

import { MdHome, MdLocationOn, MdAttachMoney, MdImage, MdPhone } from "react-icons/md";


export default function AddPropertyForm({ onAdd }) {

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");


 


  const [propertyType, setPropertyType] = useState("");

  const [rent, setRent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const isFormInvalid =
    !title.trim() ||
    !city.trim() ||
    !location.trim() ||
    !rent ||
    Number(rent) <= 0 ||
    !propertyType ||
    !imageFile 


  async function handleSubmit(e) {
    e.preventDefault();

    if (isFormInvalid) {
      alert("Please fill in all required fields");
      return;
    }

    try {

      // STEP 1: Upload image to Cloudinary

      const formData = new FormData();

      formData.append("file", imageFile);
      formData.append("upload_preset", "rental-housing-app");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dgyohc9qx/auto/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.secure_url) {
        throw new Error("Image upload failed");
      }

      const imageUrl = uploadData.secure_url;


      // STEP 2: Prepare property data according to backend

      const newProperty = {

        title: title.trim(),

        city: city.trim(),

        rent: Number(rent),

        location: location.trim(),

        image: imageUrl,

        propertyType: propertyType,

        favorite: false,

  

      


      };


      // STEP 3: Send property to parent component

      await onAdd(newProperty);


      // STEP 4: Reset form

      setTitle("");
      setCity("");
      setLocation("");
      setRent("");
      setImageFile(null);
   
   
     
      setPropertyType("");

    }

    catch (error) {
      console.error("Add property error:", error);
      alert(error.message || "Error adding property");
    }
  }


  // Map location picker



  return (

    <form onSubmit={handleSubmit} >

      {/* Property title */}

      <div className="input-wrapper">
        <MdHome className="input-icon" />

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Property Details"
          required
        />
      </div>


      {/* City */}

      <div className="input-wrapper">
        <MdLocationOn className="input-icon" />

        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
          required
        />
      </div>


      {/* Full location */}

      <div className="input-wrapper">
        <MdLocationOn className="input-icon" />

        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Full Property Address"
          required
        />
      </div>


      {/* Rent */}

      <div className="input-wrapper">
        <MdAttachMoney className="input-icon" />

        <input
          type="number"
          value={rent}
          onChange={e => setRent(e.target.value)}
          placeholder="Monthly Rent"
          min="1"
          required
        />
      </div>


      {/* Property type */}

      <div className="input-wrapper">
        <MdHome className="input-icon" />

        <select
          value={propertyType}
          onChange={e => setPropertyType(e.target.value)}
          required
        >
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
          <option value="studio">Studio</option>
        </select>
      </div>


      {/* Image */}

      <div className="input-wrapper">
        <MdImage className="input-icon" />

        <input
          type="file"
          onChange={e => setImageFile(e.target.files[0] || null)}
          accept="image/*"
          required
        />
      </div>


      {/* Contact number */}





      <button
        type="submit"
        disabled={isFormInvalid}
        style={{
          marginTop: "10px",
          width: "120px",
          border: "1px solid grey",
          borderRadius: "5px",
          height: "35px",
          cursor: isFormInvalid ? "not-allowed" : "pointer",
          fontFamily: "Playfair",
          fontWeight: "bold",
          color: "white",
          background: "black",
          opacity: isFormInvalid ? 0.5 : 1
        }}
      >
        Add Property
      </button>

    </form>

  );
}




