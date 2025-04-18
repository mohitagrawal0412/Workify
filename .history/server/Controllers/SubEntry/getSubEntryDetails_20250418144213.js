import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js"; // Import Project model properly

export const updateSubEntryToEntry = async (req, res) => {
  try {
    const { entryId, subEntryId } = req.params;
    const updates = req.body;

    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    // Find the sub-entry in the entry’s subEntries array
    const subEntry = entry.subEntries.id(subEntryId);
    if (!subEntry) return res.status(404).json({ error: "SubEntry not found" });
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
