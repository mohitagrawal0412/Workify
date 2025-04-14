import Project from "../Models/Project.model.js";
import Entry from "../Models/Entry.model.js";

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
export const getRunningProjects = async (req, res) => {
  try {
    const entries = await Entry.find().populate("project");

    const runningProjectsMap = {};

    entries.forEach((entry) => {
      const project = entry.project;
      if (!project) return;

      const isRunning = entry.subEntries?.some(
        (sub) =>
          !sub.spentTime || sub.spentTime === "running" || sub.spentTime === 0
      );

      if (isRunning) {
        runningProjectsMap[project._id] = project;
      }
    });

    const runningProjects = Object.values(runningProjectsMap);

    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCompletedProjects = async (req, res) => {
  try {
    const entries = await Entry.find().populate("project");

    const projectStatusMap = {};

    entries.forEach((entry) => {
      const project = entry.project;
      if (!project) return;

      const projectId = project._id.toString();

      if (!projectStatusMap[projectId]) {
        projectStatusMap[projectId] = { project, isRunning: false };
      }

      const hasIncomplete = entry.subEntries?.some(
        (sub) =>
          !sub.spentTime || sub.spentTime === "running" || sub.spentTime === 0
      );

      if (hasIncomplete) {
        projectStatusMap[projectId].isRunning = true;
      }
    });

    const completedProjects = Object.values(projectStatusMap)
      .filter((p) => !p.isRunning)
      .map((p) => p.project);

    res.status(200).json({ completedProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTotalTimeSpentOnProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Find all entries linked to this project
    const entries = await Entry.find({ project: projectId });

    let totalTime = 0;

    // Loop through entries and their subEntries to sum spentTime
    entries.forEach((entry) => {
      entry.subEntries.forEach((sub) => {
        totalTime += sub.spentTime || 0; // fallback if spentTime is undefined
      });
    });

    res.status(200).json({
      projectId,
      projectTitle: project.title,
      totalSpentTime: totalTime, // in hours (or your chosen unit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
