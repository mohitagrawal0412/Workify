import express from "express";
import {
  createProject,
  getAllProjects,
} from "../Controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

router.get("/:projectId/total-time", getTotalTimeSpentOnProject);

export default router;
