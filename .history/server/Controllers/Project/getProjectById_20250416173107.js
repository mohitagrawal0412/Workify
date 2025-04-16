import Project from "../../Models/Project.model.js";
import En

export const getProjectById = async (req, res) => {
  try {
    // Query the project by id and populate entries and subentries
    const project = await Project.findById(id).populate({
      path: "entries", // Populate entries field
      populate: {
        path: "subentries", // Populate subentries within each entry
        model: "Subentry", // Ensure it's the Subentry model
      },
    });

    // Return the project details, now including populated entries and subentries
    return project;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error; // Or handle it accordingly
  }
};
