import { useState } from "react";

import {
  MdHome,
  MdLocationOn,
  MdAttachMoney,
  MdImage,
  MdPhone,
} from "react-icons/md";

// "+91 87504 29847", "08750429847", "8750429847"  ->  "8750429847"
function normalizePhone(value = "") {
  let digits = String(value).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export default function AddPropertyForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rent, setRent] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const cleanPhone = normalizePhone(contactNumber);

  const isFormInvalid =
    !title.trim() ||
    !city.trim() ||
    !location.trim() ||
    !rent ||
    Number(rent) <= 0 ||
    !propertyType ||
    !/^[6-9]\d{9}$/.test(cleanPhone) ||
    !imageFile;

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
        { method: "POST", body: formData }
      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.secure_url) {
        throw new Error("Image upload failed");
      }

      // STEP 2: Prepare property data according to backend
      const newProperty = {
        title: title.trim(),
        city: city.trim(),
        rent: Number(rent),
        location: location.trim(),
        image: uploadData.secure_url,
        propertyType,
        contactNumber: cleanPhone,          // always a clean 10-digit string
        favorite: false,
      };

      // STEP 3: Send property to parent component
      await onAdd(newProperty);

      // STEP 4: Reset form
      setTitle("");
      setCity("");
      setLocation("");
      setRent("");
      setContactNumber("");
      setImageFile(null);
      setPropertyType("");
    } catch (error) {
      console.error("Add property error:", error);
      alert(error.message || "Error adding property");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Property title */}
      <div className="input-wrapper">
        <MdHome className="input-icon" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Property Details"
          required
        />
      </div>

      {/* City */}
      <div className="input-wrapper">
        <MdLocationOn className="input-icon" />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
      </div>

      {/* Full location */}
      <div className="input-wrapper">
        <MdLocationOn className="input-icon" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
          onChange={(e) => setRent(e.target.value)}
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
          onChange={(e) => setPropertyType(e.target.value)}
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

      {/* Contact number */}
      <div className="input-wrapper">
        <MdPhone className="input-icon" />
        <input
          type="tel"
          inputMode="numeric"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
          title="10-digit mobile number"
          maxLength={15}
          required
        />
      </div>

      {/* Image */}
      <div className="input-wrapper">
        <MdImage className="input-icon" />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0] || null)}
          accept="image/*"
          required
        />
      </div>

      {/* styling comes from ListingPage.css; no inline style so it can't override it */}
      <button type="submit" disabled={isFormInvalid}>
        Add Property
      </button>
    </form>
  );
}