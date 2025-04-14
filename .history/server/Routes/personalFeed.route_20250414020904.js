import express from "express";
import { } from "../c"

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
