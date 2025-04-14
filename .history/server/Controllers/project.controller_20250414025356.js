import Project from "../Models/Project.model.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllEntriesWithEntryTitle = async (req, res) => {
  try {
    const entries = await Entry.find()
      .populate("project", "title") // Only get project title
      .sort({ createdAt: -1 });

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getSubEntriesOfEntry = async (req, res) => {
  const { entryId } = req.params;

  try {
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json(entry.subEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


