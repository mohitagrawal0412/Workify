import express from "express";
import {
  createEntry,
  addSubEntry,
  getAllEntries,
  getAllEntriesWithEntryTitle,
  getSubEntriesOfEntry,
  getTotalSpentTimePerEntry,
} from "../Controllers/entry.controller.js";

const router = express.Router();

router.post("/", createEntry);
router.post("/:entryId/addSubEntry", addSubEntry);
router.get("/", getAllEntries);
router.get("/withProjectTitle", getAllEntriesWithEntryTitle);
router.get("/:entryId/subEntries", getSubEntriesOfEntry);
router.get("/totals/spent-time", getTotalSpentTimePerEntry);

export default router;
