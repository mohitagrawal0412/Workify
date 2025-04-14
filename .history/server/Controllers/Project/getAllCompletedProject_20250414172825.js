import Project from "../../Models/Project.model.js";
import Entry from "../../Models/Entry.model.js";
export const getCompletedProjects = async (req, res) => {
  try {
    const runningProjects = await Project.find({ status: "completed" });
    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
