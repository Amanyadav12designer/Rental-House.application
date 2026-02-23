const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rental Housing API is running");
});

const filePath = path.join(__dirname, "properties.json");
const usersFile = path.join(__dirname, "users.json");

// ---------- USERS ----------
function readUsers() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// ---------- AUTH ----------
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const users = readUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role,
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
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

// ---------- AUTH MIDDLEWARE ----------
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

// ---------- PROPERTIES ----------
function readProperties() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveProperties(properties) {
  fs.writeFileSync(filePath, JSON.stringify(properties, null, 2));
}

app.post("/api/properties", authMiddleware, (req, res) => {
  if (req.user.role !== "landlord") {
    return res.status(403).json({ message: "Access denied" });
  }

  const properties = readProperties();
  const newProperty = {
    ...req.body,
    id: Date.now().toString(),
    favorite: false,
  };

  properties.push(newProperty);
  saveProperties(properties);

  res.json(newProperty);
});

app.get("/api/properties", (req, res) => {
  res.json(readProperties());
});

app.delete("/api/properties/:id", authMiddleware, (req, res) => {
  let properties = readProperties();
  properties = properties.filter(p => p.id !== req.params.id);
  saveProperties(properties);
  res.json({ message: "Deleted" });
});

app.patch("/api/properties/:id/favorite", authMiddleware, (req, res) => {
  let properties = readProperties();
  properties = properties.map(p =>
    p.id === req.params.id ? { ...p, favorite: !p.favorite } : p
  );
  saveProperties(properties);
  res.json({ message: "Favorite toggled" });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 