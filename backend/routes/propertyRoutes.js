const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const ToggleFavorite = require("../controllers/propertyController").ToggleFavorite;
const getMyProperties=require("../controllers/propertyController").getMyProperties;
const deleteProperty = require("../controllers/propertyController").deleteProperty;
const updateProperty = require("../controllers/propertyController").updateProperty;
const createProperty = require("../controllers/propertyController").CreateProperty;
const getAllProperties = require("../controllers/propertyController").GetAllProperties;
const {protect,allowLandlord} = require("../middleware/authMiddleware");
router.get("/",getAllProperties);

router.get("/my-properties",protect,getMyProperties);
router.post("/",protect,allowLandlord,createProperty);

router.patch("/:id",protect,allowLandlord,updateProperty);
router.patch("/:id/favorite",protect,ToggleFavorite);
router.delete("/:id",protect,allowLandlord,deleteProperty);
module.exports = router;