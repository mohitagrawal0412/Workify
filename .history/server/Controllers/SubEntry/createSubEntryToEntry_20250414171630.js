// Add a sub-entry to a particular entry for a project
export const addSubEntryToEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const subEntry = req.body;
    entry.subEntries.push(subEntry);

    // Recalculate time
    entry.recalculateTime();
    await entry.save();

    // Also update project’s total time
    const Project = require("../models/Project");
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: await getTotalProjectTime(entry.projectId) },
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
