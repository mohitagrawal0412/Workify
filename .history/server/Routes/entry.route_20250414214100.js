import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject.js";
import { deleteEntryFromProject } from "../Controllers/Entry/deleteEntryFromProject.js";
import { getAllEntriesOfProject } from "../Controllers/Entry/getAllEntriesOfProject.js";
import { updateEntryInProject } from "../Controllers/Entry/updateEntryInProject.js";


const router = express.Router();

router.post("/:projectId", createEntryInProject);
router.post("/:projectId", deleteEntryFromProject);
router.get("/:projectId", getAllEntriesOfProject);
router.put("/:entryId", updateEntryInProject.js);


// import { createSubEntryToEntry } from "../Controllers/SubEntry/createSubEntryToEntry.js";
// import { deleteSubEntryToEntry } from "../Controllers/SubEntry/deleteSubEntryToEntry.js";
// import { getAllSubEntriesOfEntry } from "../Controllers/SubEntry/getAllSubEntriesOfEntry.js";
// import { updateSubEntryToEntry } from "../Controllers/SubEntry/updateSubEntryToEntry.js";
// router.post("/:entryId/addSubEntry", createSubEntryToEntry);

// router.post("/:entryId", createSubEntryToEntry);
// router.post(":/subEntryId", deleteSubEntryToEntry);
// router.get("/", getAllSubEntriesOfEntry);
// router.put("/:entryId", updateSubEntryToEntry);

export default router;
