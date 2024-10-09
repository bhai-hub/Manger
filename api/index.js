import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import userRoute from "./Routes/userRoute.js";

dotenv.config();

const app = express();

// Middleware   
app.use(cors());
app.use(express.json());

db()

app.use('/api/user', userRoute)
// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
