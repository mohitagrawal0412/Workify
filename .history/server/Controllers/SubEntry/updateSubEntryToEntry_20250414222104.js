export const updateSubEntryToEntry = async (req, res) => {
  try {
    const { entryId, subEntryId } = req.params;
    const updates = req.body;

    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const subEntry = entry.subEntries.id(subEntryId);
    if (!subEntry) return res.status(404).json({ error: "SubEntry not found" });

    // Apply updates
    Object.assign(subEntry, updates);

    // Recalculate times
    entry.recalculateTime();
    await entry.save();

    // Update total project time
    const Project = require("../models/Project");
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: await getTotalProjectTime(entry.projectId) },
    });

    res.json({ message: "SubEntry updated successfully", subEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
