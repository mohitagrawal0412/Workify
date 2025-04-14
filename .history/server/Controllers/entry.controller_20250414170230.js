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
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    const subEntryIndex = entry.subEntries.findIndex(
      (sub) => sub._id.toString() === subEntryId
    );

    if (subEntryIndex === -1)
      return res.status(404).json({ error: 'SubEntry not found' });

    entry.subEntries.splice(subEntryIndex, 1);
    entry.recalculateTime();
    await entry.save();

    const Project = require('../models/Project');
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: await getTotalProjectTime(entry.projectId) }
    });

    res.json({ message: 'SubEntry deleted successfully', entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSubEntryToEntry = async (req, res) => {
  try {
    const { entryId, subEntryId } = req.params;
    const updates = req.body;

    const entry = await Entry.findById(entryId);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    const subEntry = entry.subEntries.id(subEntryId);
    if (!subEntry) return res.status(404).json({ error: 'SubEntry not found' });

    // Apply updates
    Object.assign(subEntry, updates);

    // Recalculate times
    entry.recalculateTime();
    await entry.save();

    // Update total project time
    const Project = require('../models/Project');
    await Project.findByIdAndUpdate(entry.projectId, {
      $set: { totalSpentTime: await getTotalProjectTime(entry.projectId) }
    });

    res.json({ message: 'SubEntry updated successfully', subEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all sub-entries of a particular entry of any project
export const getAllSubEntriesByEntryId = async (req, res) => {
  const { entryId } = req.params;

  try {
    const entry = await Entry.findById(entryId).select("subEntries");

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(entry.subEntries); // Return all sub-entries of the entry
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub-entries", error });
  }
};
// Get all entries of a specific project
export const getAllEntriesByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const entries = await Entry.find({ project: projectId }).populate(
      "project"
    );
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  }
};
// Get total spent time per entry
export const getTotalSpentTimePerEntry = async (req, res) => {
  try {
    const entries = await Entry.find();

    const result = entries.map((entry) => {
      const totalTime = entry.subEntries.reduce((sum, sub) => {
        return sum + (sub.spentTime || 0);
      }, 0);

      return {
        entryId: entry._id,
        title: entry.title || "Untitled Entry",
        totalSpentTime: totalTime, // in hours
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
async function getTotalProjectTime(projectId) {
  const entries = await Entry.find({ projectId });
  return entries.reduce((sum, entry) => sum + entry.totalSpentTime, 0);
}