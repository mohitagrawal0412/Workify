import Entry from "../Models/Entry.model.js";
export const getAllSubEntriesByEntryId = async (req, res) => {
  try {
    const { entryId } = req.params;
    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    res.json(entry.subEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
