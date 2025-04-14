import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js"; // Import properly
import mongoose from "mongoose";

// Utility function to recalculate project time if needed
const getTotalProjectTime = async (projectId) => {
  const entries = await Entry.find({ projectId });
  return entries.reduce((acc, e) => acc + (e.totalSpentTime || 0), 0);
};

export const createSubEntryToEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const subEntry = req.body;

    // Optional: You can validate subEntry fields here if needed

    entry.subEntries.push(subEntry);

    // Recalculate total time from all sub-entries
    entry.recalculateTime();
    await entry.save();

    // Update the parent project's totalSpentTime
    const updatedTotal = await getTotalProjectTime(entry.projectId);
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: updatedTotal },
    });

    res.status(201).json({
      message: "Sub-entry added successfully",
      entry,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
