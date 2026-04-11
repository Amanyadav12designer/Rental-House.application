

mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  rent: Number,
  location: String,
  image: String,
  contactNumber: String,
  whatsappNumber: String,
  lat: Number,
lng: Number,
  favorite: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Property", propertySchema);
