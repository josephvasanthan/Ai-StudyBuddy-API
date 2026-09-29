require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/utils/db");
const { protect } = require("./src/middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/material", require("./src/routes/materials"));
app.use("/api/materials", require("./src/routes/materials"));

// Public test route
app.get("/", (req, res) => {
    res.json({
        message: "LearnMate API is running"
    });
});

// Protected test route
app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You can access this protected route",
        user: req.user
    });
});

// Server port
const PORT = process.env.PORT || 5000;

// Connect MongoDB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});