const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

let properties = [];

// ✅ Add Property
app.post("/api/properties", (req, res) => {
  const newProperty = {
    ...req.body,
    id: Date.now().toString(),
    favorite: false,
  };

  properties.push(newProperty);

  res.json(newProperty);
});

// ✅ Get Properties
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// ✅ Delete Property
app.delete("/api/properties/:id", (req, res) => {
  const id = req.params.id;

  properties = properties.filter((p) => p.id !== id);

  res.json({
    message: "Property deleted ✅",
    properties,
  });
});

// ✅ Toggle Favorite
app.patch("/api/properties/:id/favorite", (req, res) => {
  const id = req.params.id;

  properties = properties.map(p =>
    p.id === id ? { ...p, favorite: !p.favorite } : p
  );

  res.json({
    message: "Favorite toggled ✅",
    properties,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});