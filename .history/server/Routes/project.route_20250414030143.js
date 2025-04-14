import express from "express";
import {
  createProject,
  getAllProjects,
  getTotalTimeSpentOnProject,
} from "../Controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

router.get("/:projectId/total-time", getTotalTimeSpentOnProject);

export default router;
