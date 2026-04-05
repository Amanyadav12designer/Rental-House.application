console.log("🚀 PORT CHECK:", process.env.PORT);

const express = require("express");


const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// ---------------- MONGODB CONNECTION ----------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- MODELS ----------------
const User = require("./models/User");
const Property = require("./models/Property");

// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("Rental Housing API is running");
});

// ---------------- AUTH ----------------

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- AUTH MIDDLEWARE ----------------
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

// ---------------- PROPERTIES ----------------

// ADD PROPERTY
app.post("/api/properties", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "landlord") {
      return res.status(403).json({ message: "Access denied" });
    }

    const newProperty = new Property({
      ...req.body,
      favorite: false,
      available: true,
    });

    await newProperty.save();

    res.json(newProperty);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding property" });
  }
});

// GET ALL PROPERTIES
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();

    const formatted = properties.map(p => ({
      ...p.toObject(),
      id: p._id, // 👈 clean mapping
    }));

    res.json(formatted);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err); 
    res.status(500).json({ message: "Error fetching properties" });
  }
});

// DELETE PROPERTY
app.delete("/api/properties/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "landlord") {
      return res.status(403).json({ message: "Access denied" });
    }
   const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    
    res.status(500).json({ message: "Delete failed" });
  }
});

// TOGGLE FAVORITE
app.patch("/api/properties/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Not found" });
    }

    property.favorite = !property.favorite;
    await property.save();

   res.json(property.toObject());

  } catch (err) {
    res.status(500).json({ message: "Favorite failed" });
  }
});

// UPDATE PROPERTY


// ---------------- START SERVER ----------------const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});