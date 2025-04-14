import Entry from "../../Models/Entry.model.js";
import Project from "../../Models/Project.model.js";

export const deleteEntryFromProject = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    if (!entry.projectId) {
      return res.status(400).json({ error: "Project ID not found in entry" });
    }

    const project = await Project.findById(entry.projectId);
    if (!project) {
      return res.status(404).json({ error: "Associated project not found" });
    }

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
