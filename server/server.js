const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const db = require("./db/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
db();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
