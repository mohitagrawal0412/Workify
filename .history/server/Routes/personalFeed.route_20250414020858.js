import express from "express";
import { cre}

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
