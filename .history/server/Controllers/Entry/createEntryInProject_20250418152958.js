import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js";

export const createEntryInProject = async (req, res) => {
  try {
    alert(" commign to controller")
    const { projectId } = req.params;

    // Create entry with subEntries
    const entry = new Entry({ ...req.body, projectId });

    // Calculate totalSpentTime from subEntries
    const total = entry.recalculateTime();

    // Save the entry to DB
    await entry.save();

    // Update the project: push entry and increment time
    await Project.findByIdAndUpdate(projectId, {
      $push: { entries: entry._id },
      $inc: { totalSpentTime: total },
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
