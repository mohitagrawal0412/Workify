import express from "express";
import {
  createProject,
  getAllProjects,
  getTotalTimeSpentOnProject,
  getRunningProjects,
  get
} from "../Controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/running", getRunningProjects);
router.get("/completed", getCompletedProjects);
router.get("/:projectId/total-time", getTotalTimeSpentOnProject);

export default router;
