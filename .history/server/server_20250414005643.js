import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import projectRoutes from "./routes/projectRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Route middlewares
app.use("/api/projects", projectRoutes);
app.use("/api/entries", entryRoutes);

app.get("/", (req, res) => {
  res.send("WorkLogger API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
