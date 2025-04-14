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