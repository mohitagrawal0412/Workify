import express from "express";


const router = express.Router();

router.post("/:projectId", createEntryForProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesByProject);

router.get("/:entryId/", getAllSubEntriesByEntryId);
router.get("/:entryId/spent-time", getTotalSpentTimePerEntry);

export default router;
