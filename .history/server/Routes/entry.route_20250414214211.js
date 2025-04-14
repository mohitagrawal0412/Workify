import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject.js";
import { deleteEntryFromProject } from "../Controllers/Entry/deleteEntryFromProject.js";
import { getAllEntriesOfProject } from "../Controllers/Entry/getAllEntriesOfProject.js";
import { updateEntryInProject } from "../Controllers/Entry/updateEntryInProject.js";

const router = express.Router();

// Create an entry in a project
router.post("/:projectId/entries", createEntryInProject);

// Get all entries of a project
router.get("/:projectId/entries", getAllEntriesOfProject);

// Update a specific entry
router.put("/entry/:entryId", updateEntryInProject);

// Delete a specific entry
router.delete("/entry/:entryId", deleteEntryFromProject);

export default router;


export default router;





// import { createSubEntryToEntry } from "../Controllers/SubEntry/createSubEntryToEntry.js";
// import { deleteSubEntryToEntry } from "../Controllers/SubEntry/deleteSubEntryToEntry.js";
// import { getAllSubEntriesOfEntry } from "../Controllers/SubEntry/getAllSubEntriesOfEntry.js";
// import { updateSubEntryToEntry } from "../Controllers/SubEntry/updateSubEntryToEntry.js";
// router.post("/:entryId/addSubEntry", createSubEntryToEntry);

// router.post("/:entryId", createSubEntryToEntry);
// router.post(":/subEntryId", deleteSubEntryToEntry);
// router.get("/", getAllSubEntriesOfEntry);
// router.put("/:entryId", updateSubEntryToEntry);

