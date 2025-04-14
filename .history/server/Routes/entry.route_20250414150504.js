import express from "express";
import {
  createEntryForProject,
  addSubEntryToEntry,
  getAllEntriesByProject,
  getAllSubEntriesByEntryId,
  getTotalSpentTimePerEntry,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/:projectId", createEntryForProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesByProject);

router.get("/:entryId/", getAllSubEntriesByEntryId);
router.get("/:entryId/spent-time", getTotalSpentTimePerEntry);

export default router;
