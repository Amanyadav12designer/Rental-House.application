const User= require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup= async (req,res)=>{


try{


const {name,email,password}= req.body;




if(

typeof name !=="string" || !name.trim()|| typeof email !=="string" || !email.trim() || typeof password !=="string" || password.length < 8


) {

    return res.status(400).json({message: "invaild input data"});
}




const existingUser = await User.findOne({
    email:normalizedEmail
})

if(existingUser){
    return res.status(409).json({message:"email already exists"})
}

const hashedPassword = await bcrypt.hash(password,12);

const user = await User.create({

    name:name.trim(),
    email:normalizedEmail,
    password:hashedPassword,
 
});


return res.status(201).json({

    message:"user created successfully",

    user:{
        id:user._id,
        name:user.name,
      
    }
});

}
 catch(error){

    if(error.code===11000){
        return res.status(409).json({

            message:"email already exists"
        });


    }

    if(error.name==="ValidationError"){
        return res.status(400).json({
            message:"validation error"
        });

    }

    console.error("Error creating user:", error);
    return res.status(500).json({
        message:"internal server error"
    });
 }

}


exports.login= async (req,res)=>{

try{

const {email, password}= req.body;





if(typeof email !=="string"|| !email.trim()|| typeof password !=="string"|| !password){

return res.status(400).json({message:"invalid input data"});

}

const normalizedEmail = email.toLowerCase().trim();

const user = await User.findOne({email:normalizedEmail});

if(!user){

    return res.status(401).json({message:"invalid email or password"});

}

const truePassword= await bcrypt.compare(password,user.password);

if(!truePassword){
    return res.status(401).json({message:"invalid email or password"});

}

const token = jwt.sign({



    userId: user._id.toString(),role:user.role
}, process.env.JWT_SECRET,{expiresIn:"2h"});

return res.status(201).json({

    message:"login successful",token,user:{

        id:user._id,name:user.name,email:user.email,role:user.role
    }
});

}

catch(error){
    console.error("error in login",error.message);
    return res.status(500).json({message:"internal server error"});
}

};