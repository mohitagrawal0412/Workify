export const deleteSubEntryToEntry = async (req, res) => {
  try {
    const { entryId, subEntryId } = req.params;

    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const subEntryIndex = entry.subEntries.findIndex(
      (sub) => sub._id.toString() === subEntryId
    );

    if (subEntryIndex === -1)
      return res.status(404).json({ error: "SubEntry not found" });

    entry.subEntries.splice(subEntryIndex, 1);
    entry.recalculateTime();
    await entry.save();

    const Project = require("../models/Project");
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: await getTotalProjectTime(entry.projectId) },
    });

    res.json({ message: "SubEntry deleted successfully", entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
