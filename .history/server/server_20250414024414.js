import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/db.js";

import projectRoutes from "./Routes/project.route.js";
import privacy
import entryRoutes from "./Routes/entry.route.js";

dotenv.config(); // <-- loads .env file
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/entries", entryRoutes);
app.use("api/personal", personalFeedRoutes);
app.use("/api/privacy-feeds", privacyFeedRoutes);

app.get("/", (req, res) => {
  res.send("WorkLogger API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
