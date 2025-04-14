import express from "express";
import { }

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
