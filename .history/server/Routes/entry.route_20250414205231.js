import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject";

const router = express.Router();

router.post("/:projectId", createEntryInProject);
router.post("/:projectId", deleteEntryFromProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesOfProject);
router.put("/:entryId", updateEntryInProject.js);

router.get("/:entryId/", getAllSubEntriesByEntryId);
router.get("/:entryId/spent-time", getTotalSpentTimePerEntry);

export default router;
