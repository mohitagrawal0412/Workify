import Entry from "../../Models/Entry.model.js"; // Assuming your Entry model is in the models folder
import mongoose from "mongoose";

// Controller to get details of an entry by entryId
export const getEntryDetailsById = async (req, res) => {
  const { entryId } = req.params;

  // Validate if entryId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    return res.status(400).json({ error: "Invalid entry ID" });
  }

  try {
    // Find the entry by ID
    const entry = await Entry.findById(entryId); // Populate to get project details if needed
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    // Return the entry details
    res.status(200).json(entry);
  } catch (err) {
    console.error("Error fetching entry details:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching entry details" });
  }
};
