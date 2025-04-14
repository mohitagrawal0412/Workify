import Project from "../../Models/Project.model.js";
import Entry from "../../Models/Entry.model.js";

export const updateProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};
