import express from "express";
import { createProject } from "../Controllers/Project/createProject.js";
import { deleteProject } from "../Controllers/Project/deleteProject.js";
import { getAllProjects } from "../Controllers/Project/getAllProjects.js";
import { getAllCompletedProjects } from "../Controllers/Project/getAllCompletedProject.js";
import { getAllRunningProjects } from "../Controllers/Project/getAllRunnigProjects.js";
import { updateProject } from "../Controllers/Project/updateProject.js";
import {getProjectById}

const router = express.Router();

router.post("/", createProject);
router.delete("/:projectId/deleteProject", deleteProject);
router.put("/:projectId/updateProject", updateProject);
router.get("/getAllProjects", getAllProjects);
router.get("/running", getAllRunningProjects);
router.get("/completed", getAllCompletedProjects);
router.get("/:projectId",getProjectById);

export default router;
