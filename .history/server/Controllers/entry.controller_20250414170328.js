import Entry from "../Models/Entry.model.js";

export const createEntryForProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const entry = new Entry({ ...req.body, projectId });
    const total = entry.recalculateTime();
    await entry.save();

    await Project.findByIdAndUpdate(projectId, {
      $push: { entries: entry._id },
      $inc: { totalSpentTime: total },
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEntryForProject = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const timeToSubtract = entry.totalSpentTime;
    await Entry.findByIdAndDelete(entry._id);

    await Project.findByIdAndUpdate(entry.projectId, {
      $pull: { entries: entry._id },
      $inc: { totalSpentTime: -timeToSubtract },
    });

    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const editSubEntryToEntry = async (req, res) => {
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
// Get all sub-entries of a particular entry of any project
export const getAllSubEntriesByEntryId = async (req, res) => {
  try {
    const { entryId } = req.params;
    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    res.json(entry.subEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all entries of a specific project
export const getAllEntriesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const entries = await Entry.find({ projectId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get total spent time per entry

async function getTotalProjectTime(projectId) {
  const entries = await Entry.find({ projectId });
  return entries.reduce((sum, entry) => sum + entry.totalSpentTime, 0);
}
