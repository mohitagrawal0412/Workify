import express from "express";
import {
  createEntry,
  addSubEntry,
  getAllEntries,
  getAllEntriesWithProTitle,
  getSubEntriesOfEntry,
  getTotalSpentTimePerEntry,
  getRunningProjects,
  getCompletedProjects,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntry);
router.post("/:entryId/addSubEntry", addSubEntry);
router.get("/", getAllEntries);
router.get("/withProjectTitle", getAllEntriesWithProjectTitle);
router.get("/:entryId/subEntries", getSubEntriesOfEntry);
router.get("/totals/spent-time", getTotalSpentTimePerEntry);
router.get("/projects/running", getRunningProjects);
router.get("/projects/completed", getCompletedProjects);

export default router;
