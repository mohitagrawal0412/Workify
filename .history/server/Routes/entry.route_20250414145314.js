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
router.get("/", getAllEntries);
router.get("/withProjectTitle", getAllEntriesWithEntryTitle);
router.get("/:entryId/subEntries", getSubEntriesOfEntry);
router.get("/totals/spent-time", getTotalSpentTimePerEntry);

export default router;
