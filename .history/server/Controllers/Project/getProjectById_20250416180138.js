import Project from "../../Models/Project.model.js"; // Assuming this is correct
import Entry from "../../Models/Entry.model.js"; // Assuming this is correct

export const getProjectById = async (req, res) => {
  const { projectId } = req.params; // Extract project ID from the URL parameters

  try {
    // Query the project by id and populate entries and subentries
    const project = await Project.findById(id);
    // .populate({
    //   path: "entries", // Populate the 'entries' field in the project
    //   populate: {
    //     path: "subEntries", // Populate 'subEntries' within each entry
    //     model: "Subentry", // Make sure it uses the correct 'Subentry' model
    //   },
    // });

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found in db" });
    }

    // Return the project details as a JSON response
    return res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project details:", error);
    return res
      .status(500)
      .json({ message: "Error fetching project details", error });
  }
};
