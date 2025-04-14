import express from "express";

import { createEntryInProject } from "../Controllers/Entry/createEntryInProject.js";
import { deleteEntryFromProject } from "../Controllers/Entry/deleteEntryFromProject.js";
import { getAllEntriesOfProject } from "../Controllers/Entry/getAllEntriesOfProject.js";
import { updateEntryInProject } from "../Controllers/Entry/updateEntryInProject.js";

// for sub entry
import { createSubEntryToEntry } from "../Controllers/SubEntry/createSubEntryToEntry.js";
import { deleteSubEntryToEntry } from "../Controllers/SubEntry/deleteSubEntryToEntry.js";
import { updateSubEntryToEntry } from "../Controllers/SubEntry/updateSubEntryToEntry.js";

const router = express.Router();

// Create an entry in a project
router.post("/:projectId", createEntryInProject);

// Get all entries of a project
router.get("/:projectId", getAllEntriesOfProject);

// Update a specific entry
router.put("/updateEntry/:entryId", updateEntryInProject);

// Delete a specific entry
router.delete("/deleteEntry/:entryId", deleteEntryFromProject);




// Create a sub-entry in a specific entry
router.post("/:entryId", createSubEntryToEntry);



// Update a specific sub-entry inside an entry
router.put("/:entryId/:subEntryId", updateSubEntryToEntry);

// Delete a specific sub-entry from an entry
router.delete("/:entryId/:subEntryId", deleteSubEntryToEntry);

export default router;
