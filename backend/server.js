
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.use("/api/properties", require("./routes/propertyRoutes"));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to CRUD API"
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}

startServer();