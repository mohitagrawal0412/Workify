import express from "express";
import { createProject } from "../Controllers/Project/createProject.js";
// import { deleteProject } from "../Controllers/Project/deleteProject.js";
import { getAllProjects } from "../Controllers/Project/getAllProjects.js";
// import { getCompletedProjects } from "../Controllers/Project/getAllCompletedProject.js";
// import { getRunningProjects } from "../Controllers/Project/getAllRunnigProjects.js";

const router = express.Router();

router.post("/", createProject);
// router.delete("/:projectId", deleteProject);
// router.put("/", updateProject);
router.get("/getAllProjects", getAllProjects);
router.get("/running", getRunningProjects);
// router.get("/completed", getCompletedProjects);

export default router;
