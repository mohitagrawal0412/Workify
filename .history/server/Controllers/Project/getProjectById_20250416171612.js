import Project from "../../";

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate("entries"); // Remove `.populate()` if not needed

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
