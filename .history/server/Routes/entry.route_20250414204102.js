import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject";
import { }
const router = express.Router();

router.post("/:projectId", createEntryInProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesByProject);

router.get("/:entryId/", getAllSubEntriesByEntryId);
router.get("/:entryId/spent-time", getTotalSpentTimePerEntry);

export default router;
