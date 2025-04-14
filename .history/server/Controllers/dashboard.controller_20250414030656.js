// Controllers/dashboard.controller.js
import Project from "../Models/Project.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({
      status: "completed",
    });
    const runningProjects = await Project.countDocuments({ status: "running" });

    res.status(200).json({
      totalProjects,
      completedProjects,
      runningProjects,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

