const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "*", // later you can restrict this
}));
app.use(express.json());

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({ message: "Rental Housing API running" });
});

/* ---------------- FILE PATHS ---------------- */
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const usersFile = path.join(dataDir, "users.json");
const propertiesFile = path.join(dataDir, "properties.json");

/* ---------------- HELPERS ---------------- */
function readJSON(file) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* ---------------- AUTH ---------------- */
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    const users = readJSON(usersFile);

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role,
    });

    writeJSON(usersFile, users);

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readJSON(usersFile);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- AUTH MIDDLEWARE ---------------- */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

/* ---------------- PROPERTIES ---------------- */
app.get("/api/properties", (req, res) => {
  res.json(readJSON(propertiesFile));
});

app.post("/api/properties", authMiddleware, (req, res) => {
  if (req.user.role !== "landlord") {
    return res.status(403).json({ message: "Access denied" });
  }

  const properties = readJSON(propertiesFile);

  const newProperty = {
    id: Date.now().toString(),
    ...req.body,
    favorite: false,
  };

  properties.push(newProperty);
  writeJSON(propertiesFile, properties);

  res.json(newProperty);
});

app.delete("/api/properties/:id", authMiddleware, (req, res) => {
  let properties = readJSON(propertiesFile);
  properties = properties.filter(p => p.id !== req.params.id);
  writeJSON(propertiesFile, properties);
  res.json({ message: "Deleted" });
});

app.patch("/api/properties/:id/favorite", authMiddleware, (req, res) => {
  const properties = readJSON(propertiesFile).map(p =>
    p.id === req.params.id ? { ...p, favorite: !p.favorite } : p
  );

  writeJSON(propertiesFile, properties);
  res.json({ message: "Favorite toggled" });
});

/* ---------------- START ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

