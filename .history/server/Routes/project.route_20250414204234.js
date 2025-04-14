import express from "express";
import {
  createProject,
  getAllProjects,
  getTotalTimeSpentOnProject,
  getRunningProjects,
  getCompletedProjects,
} from "../Controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.delete("/:projectId", deleteProject);
router.put("/", updateProject);
router.get("/", getAllProjects);
router.get("/running", getRunningProjects);
router.get("/completed", getCompletedProjects);

export default router;
