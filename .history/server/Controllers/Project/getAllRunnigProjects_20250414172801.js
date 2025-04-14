export const getRunningProjects = async (req, res) => {
  try {
    const runningProjects = await Project.find({ status: "running" });
    res.status(200).json({ runningProjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
