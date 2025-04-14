import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject";
import {deleteEntryFromProject} from "../Controllers/Entry/deleteEntryFromProject.js"

const router = express.Router();

router.post("/:projectId", createEntryInProject);
router.post("/:projectId", deleteEntryFromProject);
router.post("/:entryId/addSubEntry", addSubEntryToEntry);
router.get("/:projectId", getAllEntriesOfProject);
router.put("/:entryId", updateEntryInProject.js);


export default router;
