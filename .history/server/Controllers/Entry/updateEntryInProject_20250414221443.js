import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js";

export const updateEntryInProject = async (req, res) => {
  try {
    const { entryId } = req.params;
    const updates = req.body;

    // Fetch the existing entry
    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    // Store previous totalSpentTime
    const previousTime = entry.totalSpentTime;

    // Apply updates
    Object.assign(entry, updates);

    // Recalculate total time if subEntries are changed
    if (updates.subEntries) {
      entry.recalculateTime();
    }

    await entry.save();

    const timeDifference = entry.totalSpentTime - previousTime;

    // Update project totalSpentTime accordingly
    await Project.findByIdAndUpdate(entry.projectId, {
      $inc: { totalSpentTime: timeDifference },
    });

    res.status(200).json({
      message: "Entry updated successfully",
      entry,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
