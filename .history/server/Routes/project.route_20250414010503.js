import express from "express";
import {
  createProject,
  getAllProjects,
} from "../Controllers/";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
