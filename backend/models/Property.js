const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({


title:{

    type:String,required: true , trim:true
} ,  city: {
    type: String, required: true, trim: true


}, rent:{

    type: Number , required: true, min: 1
}, available:{
    type: Boolean, required: true, default: true
}, owner:{
    type: mongoose.Schema.Types.ObjectId,ref:
    "User",required:true
}, location:{
  type: String,required:true
},image:{
    type: String, required: true
},
    propertyType:{
        type: String, required: true
    },favorite: {
  type: Boolean,
  default: false
},
  contactNumber:{
        type: String, required: true,match: [/^\+?[0-9\s-]{10,15}$/, "Enter a valid phone number"]
    }





});


module.exports = mongoose.model("Property", propertySchema);
