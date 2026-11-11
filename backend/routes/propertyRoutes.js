const express = require("express");
const router = express.Router();
const ToggleFavorite = require("../Controllers/propertyController").ToggleFavorite;
const getMyProperties=require("../Controllers/propertyController").getMyProperties;
const deleteProperty = require("../Controllers/propertyController").deleteProperty;
const updateProperty = require("../Controllers/propertyController").updateProperty;
const createProperty = require("../Controllers/propertyController").CreateProperty;
const getAllProperties = require("../Controllers/propertyController").GetAllProperties;
const {protect} = require("../middlewares/authMiddleware");
router.get("/",getAllProperties);

router.get("/my-properties",protect,getMyProperties);
router.post("/",protect,createProperty);

router.patch("/:id",protect,updateProperty);
router.patch("/:id/favorite",protect,ToggleFavorite);
router.delete("/:id",protect,deleteProperty);
module.exports = router;