import Project from "../Models/Project.model.js";
import Entry from "../Models/Entry.model.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

export const getRunningProjects = async (req, res) => {
  try {
    const runningProjects = await Project.find({ status: "running" });
    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCompletedProjects = async (req, res) => {
  try {
    const runningProjects = await Project.find({ status: "completed" });
    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
