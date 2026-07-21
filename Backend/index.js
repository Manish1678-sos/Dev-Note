const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/Note"));

// Test route
app.get("/", (req, res) => {
  res.send("DevNote Backend is running!");
});

// Start server
app.listen(port, () => {
  console.log(
    `DevNote Backend listening on http://localhost:${port}`
  );
});