const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({

    name:{

        type:String,
        required:true,
        trim:true

    },

     email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ]
  },

    password:{

type:String,required:true

    },
    




});

module.exports= mongoose.model("User",userSchema);