import Entry from "../../Models/Entry.model.js"; // Import Entry model
import Project from "../../Models/Project.model.js"; // Import Project model

// Controller function to get entry details by projectId and entryId
export const getEntryDetailsById = async (req, res) => {
  const { projectId, entryId } = req.params; // Extract projectId and entryId from the request

  try {
    // First, check if the project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Fetch the entry by its entryId and associated projectId
    const entry = await Entry.findOne({ _id: entryId, projectId })

    // If entry not found
    if (!entry) {
      return res
        .status(404)
        .json({ message: "Entry not found for this project" });
    }

    // Calculate totalSpentTime by summing up spentTime from subEntries
    const totalSpentTime = entry.subEntries.reduce(
      (acc, subentry) => acc + (subentry.spentTime || 0),
      0
    );

    // Return the entry details, including calculated totalSpentTime
    return res.status(200).json({
      ...entry.toObject(),
      totalSpentTime, // Add totalSpentTime to the response object
    });
  } catch (error) {
    console.error("Error fetching entry:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
