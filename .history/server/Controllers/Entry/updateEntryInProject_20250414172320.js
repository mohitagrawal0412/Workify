import Entry from "../Models/Entry.model.js";

export const deleteEntryForProject = async (req, res) => {
  try {
    // Fetch the existing entry
    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    // Store the previous totalSpentTime before updates
    const previousTime = entry.totalSpentTime;

    // Apply updates to the entry object
    Object.assign(entry, updates);

    // Optional: If subEntries are updated directly, recalculate total time
    if (updates.subEntries) {
      entry.totalSpentTime = updates.subEntries.reduce(
        (acc, sub) => acc + (sub.spentTime || 0),
        0
      );
    }

    // Save the updated entry
    await entry.save();

    // Recalculate project total time difference
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
