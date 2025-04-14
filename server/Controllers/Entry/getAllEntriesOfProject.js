import Entry from "../../Models/Entry.model.js";
export const getAllEntriesOfProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const entries = await Entry.find({ projectId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
