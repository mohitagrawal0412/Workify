import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js"; // Import Project model properly
import mongoose from "mongoose";

// Utility function to get the total time of the project
const getTotalProjectTime = async (projectId) => {
  const entries = await Entry.find({ projectId });
  return entries.reduce((acc, e) => acc + (e.totalSpentTime || 0), 0);
};

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

    // Remove the subEntry from the entry's subEntries array
    entry.subEntries.splice(subEntryIndex, 1);
    entry.recalculateTime(); // Recalculate total time for the entry
    await entry.save(); // Save the updated entry

    // Update the project totalSpentTime
    const updatedTotal = await getTotalProjectTime(entry.projectId);
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: updatedTotal },
    });

    res.json({
      message: "SubEntry deleted successfully",
      entry, // Returning the updated entry with subEntries and total time
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
