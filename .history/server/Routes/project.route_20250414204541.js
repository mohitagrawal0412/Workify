import express from "express";
import {
  createProject,
  getAllProjects,
  getRunningProjects,
  getCompletedProjects,
} from "../Controllers/project.controller.js";
import { createProject } from "../Controllers/Project/createProject.js";
import { deleteProject } from "../Controllers/Project/deleteProject.js";
import { getAllProjects } from "../Controllers/Project/getAllProject.js";


const router = express.Router();

router.post("/", createProject);
router.delete("/:projectId", deleteProject);
// router.put("/", updateProject);
router.get("/", getAllProjects);
router.get("/running", getRunningProjects);
router.get("/completed", getCompletedProjects);

export default router;
