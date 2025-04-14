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

export const delteEntryForProject = async (req, res) => {
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

// Add a sub-entry to a particular entry for a project
export const addSubEntryToEntry = async (req, res) => {
  const { entryId } = req.params; // The entryId from the route params
  const {
    date,
    taskTitle,
    spentTime,
    description,
    learnings,
    howItWasDone,
    tags,
    attachments,
  } = req.body;

  try {
    // Find the entry by entryId
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Create the new sub-entry object
    const newSubEntry = {
      date,
      taskTitle,
      spentTime,
      description,
      learnings,
      howItWasDone,
      tags,
      attachments,
    };

    // Add the new sub-entry to the subEntries array
    entry.subEntries.push(newSubEntry);

    // Save the updated entry with the new sub-entry
    await entry.save();

    // Respond with the updated entry
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Error adding sub-entry", error });
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
