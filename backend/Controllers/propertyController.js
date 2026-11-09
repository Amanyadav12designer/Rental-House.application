const property = require("../models/Property");

exports.CreateProperty = async (req,res)=>{


    try{

        console.log("Authenticated user:", req.user);

const {title,city,rent,location,image,propertyType,favorite}= req.body;
if(
        typeof image !== "string" || image.trim() === ""||
    typeof title !== "string" || title.trim() === "" ||
    typeof city !== "string" || city.trim() === "" ||
    typeof rent !== "number" || rent <= 0 ||
    typeof location !== "string" || location.trim() === "" ||
    typeof propertyType !== "string" || propertyType.trim() === "" ||

   typeof favorite !== "boolean"
) {
    return res.status(400).json({error: "Invalid input data"});
}

const newProperty = await property.create({title,city,rent,location,image,propertyType,favorite, owner: req.user.userId});
return res.status(201).json({message: "Property created successfully", property: newProperty});
    }
    catch(error){
        if(error.name === "ValidationError"){
            return res.status(400).json({message: "Validation error", error: error.message});
        }
       
    }





    return res.status(500).json({message: "Internal server error", error: error.message});




}
exports.GetAllProperties = async (req,res)=>{

try{


  const{city,search,rentRange,propertyType,page=1,limit=10,sortBy="Newest"}= req.query;

const currentPage= parseInt(page) || 1;
const pageLimit = parseInt(limit) || 10;

const skip =(currentPage - 1) * pageLimit;


if(propertyType){
    const validPropertyTypes=["apartment","house","condo","townhouse","villa","studio"];
    if(!validPropertyTypes.includes(propertyType.toLowerCase())){
        return res.status(400).json({message:"invalid propertyType"});
    } 
}

if(!Number.isInteger(currentPage) || currentPage < 1 || !Number.isInteger(pageLimit) || pageLimit < 1 || pageLimit > 100){

    return res.status(400).json({message:"invalid pagination"});

}

const filter={};


if(rentRange){

    const [minRent,maxRent]= rentRange.split(",").map(Number);
    if(isNaN(minRent) || isNaN(maxRent) || minRent < 0 || maxRent < 0 || minRent > maxRent){
        return res.status(400).json({message:"invalid rentRange"});
    }

    filter.rent={$gte:minRent,$lte:maxRent};
    
}

if(search){

    const safeSearch= search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    filter.$or=[{
        title:{$regex:safeSearch,$options:"i"}
    },{city:{$regex:safeSearch,$options:"i"}}]
}

if(city){

    filter.city={

        $in:city.split(",").map(c=>c.trim().filter(Boolean))
    }
}

if(city){

    filter.city= new RegExp(`^${city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

}

const  sortOptions={


    newest:{_id:-1},
    oldest:{_id:1},
   
}

if(!sortOptions[sortBy]){

    return res.status(400).json({message:"invalid sortBy value"});
}



    const properties= await property.find(filter).populate("owner", "name email").sort(sortOptions[sortBy]).skip(skip).limit(pageLimit);
    



const totalProperties = await property.countDocuments(filter);

return res.status(200).json({message:"Properties retrieved successfully",currentPage:page,totalPages:Math.ceil(totalProperties/limit),totalProperties,properties});

}
catch(error){
    return res.status(500).json({message: "Internal server error", error: error.message});
}
}

exports.updateProperty = async (req,res)=>{

try{
    const {id}= req.params;
    const{title,city,rent,available}= req.body;

    const updates ={};

    if(title !== undefined) updates.title=title;
    if(city !== undefined) updates.city=city;
    if(rent !== undefined) updates.rent=rent;
    if(available !== undefined) updates.available=available;

    if(Object.keys(updates).length===0){
        return res.status(400).json({message: "No valid fields provided for update"});

    }
const updatedProperty = await property.findOneAndUpdate({_id:id, owner:req.user.userId}, updates, {new:true,runValidators:true});

if(!updatedProperty){
    return res.status(404).json({message:"property not found"});

}

return res.status(200).json({message:"property updated ",property:updatedProperty});


}
catch(error){
    if(error.name ==="ValidationError" || error.name ==="CastError"){

        return res.status(400).json({message:"Invalid input data",error:error.message});
    }

    console.error("Error updating property:",error);
    return res.status(500).json({message:"Internal server error",error:error.message});
}





};


exports.deleteProperty= async(req,res)=>{

    try{

        const {id}= req.params;


        const deleteProperty = await property.findOneAndDelete({_id:id,owner:req.user.userId});

        if(!deleteProperty){
            return res.status(404).json({message:"property not found"});
        }
        return res.status(200).json({message:"property deleted successfully",property:deleteProperty});
    }
    catch(error){
     if(error.name==="castError"){
        return res.status(400).json({message:"invalid property id"});
     }
     console.error("delete property error:",error);

     return res.status(500).json({message:"internal server error"});
    }
}

exports.getMyProperties= async(req,res)=>{


   try{


 const properties= await property.find({
        owner:req.user.userId

        

    });

    return res.status(200).json({message:"Property retrived",properties});

   }

   catch(error){
    res.status(500).json({message:"internal server error"});
   }

}



exports.ToggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const propertyData = await property.findById({_id: id, owner: req.user.userId });

    if (!propertyData) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    // Toggle favorite status
    propertyData.favorite = !propertyData.favorite;

    await propertyData.save();

    return res.status(200).json({
      message: propertyData.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      property: propertyData
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid property ID"
      });
    }

    console.error("Toggle favorite error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

