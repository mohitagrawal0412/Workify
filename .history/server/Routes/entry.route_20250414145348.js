import express from "express";
import {
  createEntryForProject,
  addSubEntryToEntry,
  getAllEntriesByProject,
  getAllSubEntriesByEntryId,

  
  


  getTotalSpentTimePerEntry,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntryForProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesByProject);

router.get("/:entryId/subEntries", getAllSubEntriesByEntryId);
router.get("/totals/spent-time", getTotalSpentTimePerEntry);

export default router;
