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


